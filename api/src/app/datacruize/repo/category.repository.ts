import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Category } from "../entities/category.entities";
import { CategoryDto } from "../dto/category.dto";
import { PaginatorService } from "../../../shared/paginator/paginator";

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    private readonly paginatorService: PaginatorService
  ) {}

  async createCategory(name: string): Promise<Category> {
    const category = this.categoryRepo.create({ name });
    return this.categoryRepo.save(category);
  }
  async findAll(): Promise<Category[]> {
    return this.categoryRepo.find({where: {status: true}});
  }
  async findAllWithPaginator(
    pageIndex: number,
    pageSize: number,
    searchValue: string
  ): Promise<{ result: any[]; paginatorValue: any }> {
    console.log("Search value", searchValue);

    const cleanedSearch = searchValue?.trim().replace(/^"|"$/g, "");

    console.log("Cleaned Search value:", cleanedSearch);

    const whereClause = cleanedSearch
      ? { name: ILike(`%${cleanedSearch}%`) }
      : {};

    console.log("Where clause:", whereClause);

    const skip = (pageIndex - 1) * pageSize;

    const [categoryList, totalCount] = await this.categoryRepo.findAndCount({
      where: whereClause,
      take: pageSize,
      skip,
      order: { id: "DESC" },
    });

    const result = categoryList.map((item) => ({
      id: item.id,
      name: item.name,
      order: item.order,
      status: item.status,
    }));

    const paginatorValue = await this.paginatorService.paginatorCount(
      pageIndex,
      pageSize,
      totalCount,
      result
    );

    return { result, paginatorValue };
  }

  async findById(id: number): Promise<Category> {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException("Category not found");
    }
    return category;
  }
  async findCategoryWithSubcategory(): Promise<any> {
    const result = await this.categoryRepo
      .createQueryBuilder("category")
      .leftJoinAndSelect("category.subcategories", "subcategory")
      .select([
        "category.id",
        "category.name",
        "subcategory.id",
        "subcategory.id",
        "subcategory.name",
        "subcategory.url",
        "subcategory.title",
        "subcategory.description",
      ])
      .getMany();
    // const formatted = result.map(category => ({
    //   ...category,

    // }))
    return result;
  }
  async updateCategory(id: number, name: string): Promise<Category> {
    const category = await this.findById(id);
    category.name = name;
    return this.categoryRepo.save(category);
  }
  async deleteCategory(id: number): Promise<void> {
    const result = await this.categoryRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException("Category not Found");
    }
  }
}
