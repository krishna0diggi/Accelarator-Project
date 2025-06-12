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
  async getAll(
    pageIndex: number,
    pageSize: number,
    searchValue: string,
  ): Promise<any> {
   return this.categoryRepo.findAllWithPaginator(pageIndex,pageSize, searchValue)
  }
  async getAllActive(){
    return this.categoryRepo.findAll()
  }

  async update(id: number, name: string) {
    return this.categoryRepo.updateCategory(id, name);
  }
  async getCategoryById(id:number){
    return this.categoryRepo.findById(id)
  }
}
