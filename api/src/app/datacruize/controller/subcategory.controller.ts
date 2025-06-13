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
// import { SubcategoryService } from './subcategory.service';
// import { SubcategoryDto } from './dto/subcategory.dto';
import { SubcategoryService } from '../services/subcategory.services';
import { SubcategoryDto } from '../dto/subcategory.dto';

@ApiTags("subcategory")
@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Post()
  async create(@Body() dto: SubcategoryDto) {
    return this.subcategoryService.create(dto);
  }

  @Get('/getall')
  async getAllActive() {
    return this.subcategoryService.getAllActive();
  }
  
  @Get()
  async getAll(
    @Query('pageIndex') pageIndex:number,
    @Query('pageSize') pageSize:number,
    @Query('searchFilter') searchValue: string
)
{
  return this.subcategoryService.getAll(pageIndex, pageSize, searchValue)
}
  @Get('/subcat-with-cat')
  async getSubcatWithCategory(){
    return this.subcategoryService.getSubcategoryWithCategory()
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.subcategoryService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<SubcategoryDto>
  ) {
    return this.subcategoryService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.subcategoryService.delete(id);
  }
}
