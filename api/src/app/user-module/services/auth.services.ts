import { RegisterDto } from "../dto/register.dto";
import { UsersRepository } from "../repo/users.repository";
import { RoleRepository } from "../repo/role.repository";
import { DepartmentRepository } from "../repo/dept.repository";
import { LoginDto } from "../dto/login.dto";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from "bcryptjs";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ResetPasswordDto } from "../dto/resetPassword";

interface DecodedToken {
  id: string;
  name: string;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
   public jwtSecret = process.env.JWT_SECRET;
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
      // empId: registerDto.emp_id,
      password: hashedPassword,
      // workLocationId: registerDto.workLocation_id,
      role: role,
      department: department,
      otp: verificationCode,
      isVerified: false,
      isActive: true,
    };

    await this.userRepo.createUser(newUser);

    return { message: "User Registered Successfully" };
  }
  async login(loginDto: LoginDto):Promise<{
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
    };
    token: string;
  }> {
    const employee = await this.userRepo.findByEmailWithRelation(loginDto.email)
    if(employee?.isVerified === false) {
      throw new UnauthorizedException('Account not verified. Please verify your account first')
    }
    if(!employee || !employee.password){
      throw new UnauthorizedException('Invalid Credentials')
    }
    const isPasswordValid = await bcrypt.compare(loginDto.password, employee.password)
    if(!isPasswordValid){
      throw new UnauthorizedException('Invalid Credentials')
    }
      if (!this.jwtSecret) {
      throw new Error('JWT_SECRET is not set in environment variables');
    }
     let currentRole = employee.role.name;
      const token = jwt.sign(
      {
        name: employee.name,
        email: employee.email,
        role: currentRole,
      },
      this.jwtSecret,
      { expiresIn: '1d' }
    );

    const user = {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      role: currentRole,
    };
    console.log(user);

    return { user, token };
  }

   async getCurrentUser(authHeader: string): Promise<any> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token format');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    try {
      const decoded = jwt.verify(
        token,
        this.jwtSecret as string
      ) as DecodedToken;

      const employee = await this.userRepo.findByEmailWithRelation(decoded.email)

      if (!employee) {
        throw new UnauthorizedException('User not found');
      }

      const userWithoutSensitiveData = {
        id: employee.id,
  
        name: employee.name,
        email: employee.email,
        department: {
          id: employee.department.id,
          name: employee.department.name,
        },
        role: employee.role.name,
      };
      return userWithoutSensitiveData;
    } catch (error) {
      throw new UnauthorizedException('Token is invalid or expired');
    }
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
