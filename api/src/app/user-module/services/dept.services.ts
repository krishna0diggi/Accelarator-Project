import { Injectable, BadRequestException } from "@nestjs/common";
import { DepartmentRepository } from "../repo/dept.repository";
import { Department } from "../entities/dept.entity";

@Injectable()
export class DepartmentService {
  constructor(
    private readonly deptRepo: DepartmentRepository,
  ) {}

  async create(name: string): Promise<{ message: string; department: Department }> {
    const departments = await this.deptRepo.findAll();
    const exists = departments.find((d) => d.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      throw new BadRequestException(`Department "${name}" already exists`);
    }

    const department = await this.deptRepo.createDepartment(name);
    return {
      message: "Department created successfully",
      department,
    };
  }

  async getDept(): Promise<Department[]> {
    return this.deptRepo.findAll();
  }

  async getDeptById(id: number): Promise<Department> {
    return this.deptRepo.findById(id);
  }

  async updateDept(id: number, name: string): Promise<{ message: string; department: Department }> {
    const department = await this.deptRepo.updateDepartment(id, name);
    return {
      message: "Department updated successfully",
      department,
    };
  }

  async deleteDept(id: number): Promise<{ message: string }> {
    await this.deptRepo.deleteDepartment(id);
    return {
      message: "Department deleted successfully",
    };
  }
}
