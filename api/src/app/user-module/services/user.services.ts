import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repo/users.repository";
import { RoleRepository } from "../repo/role.repository";
import { DepartmentRepository } from "../repo/dept.repository";
import { User } from "../entities/user.entity";

@Injectable()
export class UserService {
  // @InjectRepository(UsersRepository)
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly roleRepo: RoleRepository,
    private readonly deptRepo: DepartmentRepository
  ) {}

  async getAll() {}
  async validateUser(email: string, password: string) {
    return await this.userRepo.validateUser(email, password);
  }
  async findEmail(email: string) {
    return await this.userRepo.findByEmail(email);
  }
  async createUser(userData: Partial<User>): Promise<User> {
    return await this.userRepo.createUser(userData);
  }
}
