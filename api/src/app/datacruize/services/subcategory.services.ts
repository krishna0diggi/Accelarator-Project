import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { SubcategoryDto } from "../dto/subcategory.dto";
import { SubcategoryRepo } from "../repo/subcategory.repository";
import { CategoryRepository } from "../repo/category.repository";
@Injectable()
export class SubcategoryService {
  constructor(
    private readonly subcategoryRepo: SubcategoryRepo,
    private readonly categoryRepo: CategoryRepository
  ) {}

  async create(subcategoryDto: SubcategoryDto): Promise<{ message: string }> {
    // Always use lowercase for name comparison
    const name = subcategoryDto.name.toLowerCase();
    const exists = await this.subcategoryRepo.findByName(name);

    if (exists) {
      throw new BadRequestException("Subcategory already exists");
    }
    const category = await this.categoryRepo.findById(
      subcategoryDto.categoryId
    );
    // if (!category) { throw new NotFoundException(`Category with ID ${subcategoryDto.categoryId} not found`)}

    // Ensure the name is stored in lowercase
    await this.subcategoryRepo.createSubcategory({
      ...subcategoryDto,
      name,
      category: category,
    });

    return { message: "Subcategory created successfully" };
  }

  async getAllActive() {
    return await this.subcategoryRepo.findAll();
  }
  async getAll(
    pageIndex: number,
    pageSize: number,
    searchValue: string
  ): Promise<any> {
    return await this.subcategoryRepo.findAllWithPaginator(
      pageIndex,
      pageSize,
      searchValue
    );
  }
  async getSubcategoryWithCategory( pageIndex: number,
    pageSize: number,
    searchValue: string) {
    return await this.subcategoryRepo.findSubcategoryWithCategory(  pageIndex,
      pageSize,
      searchValue);
  }

  async getById(id: number) {
    return await this.subcategoryRepo.findById(id);
  }

  async update(id: number, updateData: Partial<SubcategoryDto>) {
    return await this.subcategoryRepo.updateSubcategory(id, updateData);
  }

  async delete(id: number) {
    await this.subcategoryRepo.deleteSubcategory(id);
    return { message: `Subcategory with ID ${id} deleted` };
  }
}
