import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Role } from "../entities/role.entity";

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.user.findOne({ where: { email } });
  }
  async checkDuplicateEmailOrEmpId(
    email: string,
    empId: string
  ): Promise<void> {
    const userByEmail = await this.user.findOne({ where: { email } });
    if (userByEmail) {
      throw new BadRequestException("Email already exists");
    }

    const userByEmpId = await this.user.findOne({ where: { empId } });
    if (userByEmpId) {
      throw new BadRequestException("Employee ID already exists");
    }
  }

  async findRoleById(roleId: number): Promise<Role> {
    const role = await this.roleRepo.findOne({ where: { id: roleId } });

    if (!role) {
      throw new Error(`Role with ID ${roleId} not found`);
    }

    return role;
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.user.create(userData);
    return this.user.save(user);
  }
  async updateUser(userId: number, updateData: Partial<User>): Promise<User> {
    const user = await this.user.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException(`User with ID ${userId} not found`);
    }
    // if (updateData.name !== undefined) {
    //   user.name = updateData.name;
    // }
    // if (updateData.email !== undefined) {
    //   user.email = updateData.email;
    // }
    // if (updateData.empId !== undefined) {
    //   user.empId = updateData.empId;
    // }
    // if (updateData.password !== undefined) {
    //   user.password = updateData.password;
    // }
    Object.assign(user, updateData);
    return this.user.save(user);
  }
}
