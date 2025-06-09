import { Injectable, BadRequestException } from "@nestjs/common";
import { RoleRepository } from "../repo/role.repository";
import { Role } from "../entities/role.entity";

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepo: RoleRepository
  ) {}

  async create(name: string): Promise<{ message: string; role: Role }> {

    try {
      const existingRole = await this.roleRepo.findByName(name);
      if (existingRole) {
        throw new BadRequestException(`Role "${name}" already exists`);
      }
    } catch (error) {
      if (!(error instanceof BadRequestException)) {
      } else {
        throw error;
      }
    }

    const role = await this.roleRepo.createRole(name);
    return {
      message: "Role created successfully",
      role,
    };
  }


  async getRoles(): Promise<Role[]> {
    return this.roleRepo.findAll();
  }

  async getRoleById(id: number): Promise<Role> {
    return this.roleRepo.findById(id);
  }

  async updateRole(id: number, name: string): Promise<{ message: string; role: Role }> {
    const role = await this.roleRepo.updateRole(id, name);
    return {
      message: "Role updated successfully",
      role,
    };
  }

  async deleteRole(id: number): Promise<{ message: string }> {
    await this.roleRepo.deleteRole(id);
    return {
      message: "Role deleted successfully",
    };
  }
}
