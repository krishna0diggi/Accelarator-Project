// import { RegisterDto } from "../dto/register.dto";
// import { UsersRepository } from "../repo/users.repository";
// import { RoleRepository } from "../repo/role.repository";
// import { DepartmentRepository } from "../repo/dept.repository";
// import { LoginDto } from "../dto/login.dto";
import { LoginDto } from "./login.dto";
import { RegisterDto } from "./register.dto";
import * as bcrypt from "bcryptjs";
import { Repository } from "typeorm";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user-module/entities/user.entity";
import { Role } from "../user-module/entities/role.entity";
import { Department } from "../user-module/entities/dept.entity";
import { JwtService } from '@nestjs/jwt';
import { UserService } from "../user-module/services/user.services";

export interface AccessToken {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    
    @InjectRepository(Department)
    private readonly deptRepo: Repository<Department>,
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async validateUser(email:string, password:string):Promise<User>{
    const user: User | null = await this.userService.findEmail(email)
    if(!user){
      throw new BadRequestException('User not found')
    }
    const isMatch:boolean = bcrypt.compareSync(password, user.password)
    if(!isMatch){
      throw new BadRequestException('Password doest not match')
    }
    return user;
  }

 async login(user: User): Promise<AccessToken> {
    const payload = { email: user.email, id: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
 async register(registerDto: RegisterDto): Promise<AccessToken> {
    const existingUser = await this.userService.findEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = {
      ...registerDto,
      password: hashedPassword,
      empId: registerDto.emp_id, 
      role: { id: registerDto.role_id }, 
      department: { id: registerDto.dept_id },
    } as unknown as User;
    const createdUser = await this.userService.createUser(newUser);
    return this.login(createdUser);
  }

}
