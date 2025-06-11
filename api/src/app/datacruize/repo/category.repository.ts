import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../entities/category.entities";

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>
  ) {}

  async createCategory(name: string):Promise<Category>{
    const category = this.categoryRepo.create({name});
    return this.categoryRepo.save(category)
  }
  async findAll(): Promise<Category[]>{
    return this.categoryRepo.find()
  }
  async findById(id:number):Promise<Category> {
    const category = await this.categoryRepo.findOne({where: {id}});
    if (!category) {
        throw new NotFoundException('Category not found')
    }
    return category;
  }
  async findCategoryWithSubcategory():Promise<any>{
    const result = await this.categoryRepo.createQueryBuilder('category')
    .leftJoinAndSelect('category.subcategories', 'subcategory')
    .select([
      'category.id',
      'category.name',
      'subcategory.id',
      'subcategory.id',
      'subcategory.name',
      'subcategory.url',
      'subcategory.title',
      'subcategory.description',
    ])
    .getMany()
    // const formatted = result.map(category => ({
    //   ...category,
      
    // }))
    return result 

  }
  async updateCategory(id:number, name: string):Promise<Category> {
    const category = await this.findById(id)
    category.name = name;
    return this.categoryRepo.save(category)
  }
  async deleteCategory(id:number):Promise<void>{
   const result = await this.categoryRepo.delete(id)
   if(result.affected ===0)
   {
    throw new NotFoundException('Category not Found')
   }
  }
}
