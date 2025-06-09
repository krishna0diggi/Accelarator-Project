import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Headers,
  Put,
  Delete,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RoleService } from "../services/role.services";

@ApiTags("role")
@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Post()
  create(@Body("name") name: string) {
    return this.roleService.create(name);
  }

  @Get()
  getRoles() {
    return this.roleService.getRoles();
  }

  @Get(":id")
  getRoleById(@Param("id") id: number) {
    return this.roleService.getRoleById(id);
  }

  @Put(":id")
  updateRole(@Param("id") id: number, @Body("name") name: string) {
    return this.roleService.updateRole(id, name);
  }

  @Delete(":id")
  deleteRole(@Param("id") id: number) {
    return this.roleService.deleteRole(id);
  }
}
