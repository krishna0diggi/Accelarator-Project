import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../entities/dept.entity';

@Injectable()
export class DepartmentRepository {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>, 
  ) {}

  async findById(id: number): Promise<Department> {
    const dept = await this.departmentRepo.findOne({ where: { id } });
    if (!dept) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return dept;
  }

  async findAll(): Promise<Department[]> {
    return this.departmentRepo.find();
  }

  async createDepartment(name: string): Promise<Department> {
    const dept = this.departmentRepo.create({ name });
    return this.departmentRepo.save(dept);
  }

  async updateDepartment(id: number, name: string): Promise<Department> {
    const dept = await this.findById(id);
    dept.name = name;
    return this.departmentRepo.save(dept);
  }

  async deleteDepartment(id: number): Promise<void> {
    const result = await this.departmentRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
  }
}
