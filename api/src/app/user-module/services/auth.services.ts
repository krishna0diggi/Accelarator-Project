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
import { ResetPasswordDto } from "../dto/resetPassword";

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

   async getCurrentUser(authHeader: string): Promise<any> {
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   throw new UnauthorizedException('Invalid token format');
    // }

    // const token = authHeader.split(' ')[1];

    // if (!token) {
    //   throw new UnauthorizedException('Token missing');
    // }

    // try {
    //   const decoded = jwt.verify(
    //     token,
    //     this.jwtSecret as string
    //   ) as DecodedToken;

    //   const employee = await this.employeeRepository.findOne({
    //     where: { email: decoded.email },
    //     relations: ['department', 'worklocation', 'role'],
    //   });

    //   if (!employee) {
    //     throw new UnauthorizedException('User not found');
    //   }

    //   const userWithoutSensitiveData = {
    //     id: employee.id,
    //     empId: employee.empID,
    //     name: employee.name,
    //     email: employee.email,
    //     department: {
    //       id: employee.department.id,
    //       name: employee.department.name,
    //     },
    //     worklocation: {
    //       id: employee.worklocation.id,
    //       location: employee.worklocation.location,
    //     },
    //     role: employee.role.name,
    //   };

    //   return userWithoutSensitiveData;
    // } catch (error) {
    //   throw new UnauthorizedException('Token is invalid or expired');
    // }
  }
  async verifyOtp(email:string, otp:string){
     return { message: 'Registration successful. Account created.' };

  }
  async sendResetOtp(email:string){

  }
  async resetPassword(dto:ResetPasswordDto)
  {

  }
  async resendOtp(email:string)
  {

  }
}
