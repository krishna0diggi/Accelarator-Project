import { Body, Controller, Get, Param, Post, Headers, Put, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DepartmentService } from "../services/dept.services";

@ApiTags("user")
@Controller("user")
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  @Post("register")
  create(@Body("name") name: string) {
    return this.departmentService.create(name);
  }
  @Get()
  getAllDepartments() {
    return this.departmentService.getDept();
  }

  @Get(":id")
  getDepartmentById(@Param("id") id: number) {
    return this.departmentService.getDeptById(id);
  }

  @Put(":id")
  updateDepartment(@Param("id") id: number, @Body("name") name: string) {
    return this.departmentService.updateDept(id, name);
  }

  @Delete(":id")
  deleteDepartment(@Param("id") id: number) {
    return this.departmentService.deleteDept(id);
  }
}
