import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entities';
import { Subcategory } from './entities/subcategory.entities';
import { CategoryService } from './services/category.services';
import { SubcategoryService } from './services/subcategory.services';
import { CategoryRepository } from './repo/category.repository';
import { SubcategoryRepo } from './repo/subcategory.repository';
import { CategoryController } from './controller/category.controller';
import { SubcategoryController } from './controller/subcategory.controller';
import { PaginatorService } from '../../shared/paginator/paginator';


@Module({
  imports: [TypeOrmModule.forFeature([Category, Subcategory])],
  providers: [CategoryService, SubcategoryService, PaginatorService, CategoryRepository, SubcategoryRepo   ],
  controllers: [CategoryController, SubcategoryController]
})
export class DatacruizeModule {}
