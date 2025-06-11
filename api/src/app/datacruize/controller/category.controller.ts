import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { SubcategoryDto } from '../dto/subcategory.dto';
import { CategoryService } from '../services/category.services';
import { CategoryDto } from '../dto/category.dto';

@ApiTags("category")
@Controller('category')
export class CategoryController {
  constructor(private readonly catService: CategoryService) {}

  @Post()
  async create(@Body() dto: CategoryDto) {
    return this.catService.create(dto);
  }
  @Get('/cat-with-subcat')
  async getCatWithSubcat(){
    return this.catService.getCategoryWithSubcategory()
  }

//   @Get()
//   async getAll() {
//     return this.catService.getAll();
//   }

//   @Get(':id')
//   async getById(@Param('id', ParseIntPipe) id: number) {
//     return this.catService.getById(id);
//   }

//   @Put(':id')
//   async update(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() dto: Partial<SubcategoryDto>
//   ) {
//     return this.catService.update(id, dto);
//   }

//   @Delete(':id')
//   async delete(@Param('id', ParseIntPipe) id: number) {
//     return this.catService.delete(id);
//   }
}
