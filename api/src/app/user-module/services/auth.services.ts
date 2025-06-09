import { RegisterDto } from "../dto/register.dto";
import { UsersRepository } from "../repo/users.repository";
import { RoleRepository } from "../repo/role.repository";
import { DepartmentRepository } from "../repo/dept.repository";
import { LoginDto } from "../dto/login.dto";
import * as bcrypt from "bcryptjs";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly roleRepo: RoleRepository,
    private readonly deptRepo: DepartmentRepository
  ) {}

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const existingUser = await this.userRepo.findByEmail(registerDto.email);
    if (existingUser) {
      if (existingUser.email === registerDto.email) {
        throw new BadRequestException("Email Already Registered");
      }
    }
    const department = await this.deptRepo.findById(registerDto.dept_id);
    if (!department) throw new NotFoundException("Department not found");

    const role = await this.roleRepo.findById(registerDto.role_id);
    if (!role) throw new NotFoundException("Role Not Found");

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const newUser: Partial<any> = {
      name: registerDto.name,
      email: registerDto.email,
      empId: registerDto.emp_id,
      password: hashedPassword,
      workLocationId: registerDto.workLocation_id,
      role: role,
      department: department,
      otp: registerDto.otp.toString(),
      isVerified: false,
      isActive: true,
    };

    await this.userRepo.createUser(newUser);

    return { message: "User Registered Successfully" };
  }
  async login(loginDto: LoginDto) {}
}
