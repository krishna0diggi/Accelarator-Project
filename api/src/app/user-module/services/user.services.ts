import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repo/users.repository";
import { RoleRepository } from "../repo/role.repository";
import { DepartmentRepository } from "../repo/dept.repository";

@Injectable()
export class UserService {
  // @InjectRepository(UsersRepository)
  constructor(
    // @InjectRepository(UsersRepository)
    // private readonly userRepo: Repository<UsersRepository>
    private readonly userRepo: UsersRepository,
    private readonly roleRepo: RoleRepository,
    private readonly deptRepo: DepartmentRepository
  ) {}

  async getAll() {
  }
}
