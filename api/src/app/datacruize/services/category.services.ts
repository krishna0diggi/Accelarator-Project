import { CategoryDto } from "../dto/category.dto";
import { CategoryRepository } from "../repo/category.repository";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}
  async create(categoryDto: CategoryDto): Promise<{ message: string }> {
    const category = await this.categoryRepo.findAll();
    const exists = category.find((d) => d.name === categoryDto.name);
    if (exists) {
      throw new BadRequestException("Category is already exists");
    }
    await this.categoryRepo.createCategory(categoryDto.name);
    return { message: "Category created successfully" };
  }
  async getCategoryWithSubcategory() {
    return this.categoryRepo.findCategoryWithSubcategory();
  }
  async delete(id: number) {
    return await this.categoryRepo.deleteCategory(id);
  }
  // ADMIN 
  async getAll(
    pageIndex: number,
    pageSize: number,
    searchValue: string,
  ): Promise<any> {
   return this.categoryRepo.findAllWithPaginator(pageIndex,pageSize, searchValue)
  }

  // USER
  async getAllActive(){
    return this.categoryRepo.findAll()
  }
  
  // ADMIN
  async update(id:number, updateData: Partial<CategoryDto>) {
    console.log("Id", id);
    // console.log("To update the data", updateData);
    return this.categoryRepo.updateCategory(id, updateData);
  }

  async getCategoryById(id:number){
    return this.categoryRepo.findById(id)
  }
}
