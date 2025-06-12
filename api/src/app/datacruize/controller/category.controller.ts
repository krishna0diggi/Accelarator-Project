import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  Query,
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
  @Get('/getall')
  async getActiveCategory(){
    return this.catService.getAllActive()
  }
  
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.catService.getCategoryById(id);
  }

  @Get()
  async getAll(
    @Query('pageIndex') pageIndex:number,
    @Query ('pageSize') pageSize: number,
    @Query('searchFilter') searchValue:string
  ):Promise<any> {
    return this.catService.getAll(pageIndex, pageSize, searchValue);
  }


  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CategoryDto
  ) {
    return this.catService.update(id, dto.name);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.catService.delete(id);
  }
}
