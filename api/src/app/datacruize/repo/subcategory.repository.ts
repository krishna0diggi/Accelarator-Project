import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Subcategory } from "../entities/subcategory.entities";
import { PaginatorService } from "../../../shared/paginator/paginator";
@Injectable()
export class SubcategoryRepo {
  constructor(
    @InjectRepository(Subcategory)
    private readonly subcategoryRepo: Repository<Subcategory>,
    private readonly paginatorService: PaginatorService
  ) {}
  async createSubcategory(
    subcatData: Partial<Subcategory>
  ): Promise<Subcategory> {
    const CreateSubcategoryData = this.subcategoryRepo.create(subcatData);
    return this.subcategoryRepo.save(CreateSubcategoryData);
  }
  async findAll(): Promise<Subcategory[]> {
    return this.subcategoryRepo.find({where: {status:true}});
  }
  async findById(id: number): Promise<Subcategory> {
    const subcateId = await this.subcategoryRepo.findOne({ where: { id: id } });
    if (!subcateId) {
      throw new NotFoundException("Subcategory Not Found");
    }
    return subcateId;
  }

  async findAllWithPaginator(
    pageIndex: number,
    pageSize: number,
    searchValue: string
  ): Promise<{ result: any[]; paginatorValue: any }> {
    const cleanedSearch = searchValue?.trim().replace(/^"|"$/g, "");

    // console.log("Cleaned Search value:", cleanedSearch);

    const whereClause = cleanedSearch
      ? { name: ILike(`%${cleanedSearch}%`) }
      : {};

    // console.log("Where clause:", whereClause);

    const skip = (pageIndex - 1) * pageSize;

    const [subcategoryList, totalCount] = await this.subcategoryRepo.findAndCount({
      where: whereClause,
      take: pageSize,
      skip,
      order: { id: "DESC" },
    });

    const result = subcategoryList.map((item) => ({
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
async findSubcategoryWithCategory(
  pageIndex: number,
  pageSize: number,
  searchValue: string
): Promise<{ result: any[]; paginatorValue: any }> {
  const cleanedSearch = searchValue?.trim().replace(/^"|"$/g, "");
  const skip = (pageIndex - 1) * pageSize;

  const query = this.subcategoryRepo
    .createQueryBuilder("subcategory")
    .innerJoinAndSelect("subcategory.category", "category")
    .select([
      "subcategory.id",
      "subcategory.name",
      "subcategory.url",
      "subcategory.title",
      "subcategory.description",
      "subcategory.status",
      "subcategory.order",
      "category.name",
    ]);

  // ✅ Apply search filter if provided
  if (cleanedSearch) {
    query.where("subcategory.name ILIKE :search", { search: `%${cleanedSearch}%` });
  }

  // ✅ Apply pagination
  const [subcategories, totalCount] = await query
    .orderBy("subcategory.id", "DESC")
    .skip(skip)
    .take(pageSize)
    .getManyAndCount();

  // ✅ Format results
  const result = subcategories.map((subcat) => ({
    id: subcat.id,
    name: subcat.name,
    url: subcat.url,
    title: subcat.title,
    description: subcat.description,
    order: subcat.order,
    status: subcat.status,
    categoryName: subcat.category.name,
  }));

  // ✅ Generate paginator info
  const paginatorValue = await this.paginatorService.paginatorCount(
    pageIndex,
    pageSize,
    totalCount,
    result
  );

  return { result, paginatorValue };
}


  async findByName(name: string): Promise<Subcategory | null> {
    return await this.subcategoryRepo.findOne({
      where: { name: name.toLowerCase() },
    });
  }

  async updateSubcategory(
    id: number,
    updateData: Partial<Subcategory>
  ): Promise<Subcategory> {
    const subcat = await this.subcategoryRepo.findOne({ where: { id: id } });
    if (!subcat) {
      throw new NotFoundException(`Subcategory Not found with id: ${id}`);
    }
    Object.assign(subcat, updateData);
    return this.subcategoryRepo.save(subcat);
  }
  async deleteSubcategory(id: number): Promise<void> {
    const subcatId = await this.subcategoryRepo.delete(id);
    if (subcatId.affected === 0) {
      throw new NotFoundException(`Subcategory with ID ${id} not found `);
    }
  }
}
