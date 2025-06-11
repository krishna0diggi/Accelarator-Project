import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Subcategory } from "../entities/subcategory.entities";
@Injectable()
export class SubcategoryRepo {
  constructor(
    @InjectRepository(Subcategory)
    private readonly subcategoryRepo: Repository<Subcategory>
  ) {}
  async createSubcategory(
    subcatData: Partial<Subcategory>
  ): Promise<Subcategory> {
    const CreateSubcategoryData = this.subcategoryRepo.create(subcatData);
    return this.subcategoryRepo.save(CreateSubcategoryData);
  }
  async findAll(): Promise<Subcategory[]> {
    return this.subcategoryRepo.find();
  }
  async findById(id: number): Promise<Subcategory> {
    const subcateId = await this.subcategoryRepo.findOne({ where: { id: id } });
    if (!subcateId) {
      throw new NotFoundException("Subcategory Not Found");
    }
    return subcateId;
  }
  async findSubcategoryWithCategory():Promise<any>{
    const result = await this.subcategoryRepo.createQueryBuilder('subcategory')
     .innerJoinAndSelect('subcategory.category', 'category') 
    .select([
      'subcategory.id',
      'subcategory.name',
      'subcategory.url',
      'subcategory.title',
      'subcategory.description',
      'category.name'  
    ])
    .getMany();

  const formatted = result.map(subcat => ({
    ...subcat,
    categoryName: subcat.category.name
  }));

  return formatted;
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
