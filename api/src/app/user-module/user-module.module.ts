import { Module } from '@nestjs/common';
// import { UsersService } from './users/users.service';
import { UserService } from './services/user.services';
import { UsersController } from './controller/user.controller';
import { RoleService } from './services/role.services';
import { DepartmentService } from './services/dept.services';
import { AuthService } from './services/auth.services';
import { RoleController } from './controller/role.controller';
import { DepartmentController } from './controller/dept.controller';
import { AuthController } from './controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Department } from './entities/dept.entity';
import { User } from './entities/user.entity';
import { RoleRepository } from './repo/role.repository';
import { DepartmentRepository } from './repo/dept.repository';
import { UsersRepository } from './repo/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Department,User])],
  providers: [UserService,RoleService,DepartmentService,AuthService,RoleRepository, DepartmentRepository, UsersRepository],
  controllers: [UsersController, RoleController, DepartmentController, AuthController]
})
export class UserModuleModule {}
