import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repo/users.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  // @InjectRepository(UsersRepository)
  constructor(
    // @InjectRepository(UsersRepository)
    // private readonly userRepo: Repository<UsersRepository>
    private readonly userRepo: UsersRepository
  ) {}

  async getAll() {
  }
}
