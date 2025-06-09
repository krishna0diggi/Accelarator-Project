
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async findById(id: number): Promise<Role> {
    const role = await this.roleRepo.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role;
  }

  async findByName(name: string): Promise<Role> {
    const role = await this.roleRepo.findOne({ where: { name } });
    if (!role) {
      throw new NotFoundException(`Role "${name}" not found`);
    }
    return role;
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepo.find();
  }

  async createRole(name: string): Promise<Role> {
    const role = this.roleRepo.create({ name });
    return this.roleRepo.save(role);
  }

  async updateRole(id: number, name: string): Promise<Role> {
    const role = await this.findById(id);
    role.name = name;
    return this.roleRepo.save(role);
  }

  async deleteRole(id: number): Promise<void> {
    const result = await this.roleRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
  }
}
