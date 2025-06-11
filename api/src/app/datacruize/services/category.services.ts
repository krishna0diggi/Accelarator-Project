import { CategoryDto } from "../dto/category.dto";
import { CategoryRepository } from "../repo/category.repository";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepo: CategoryRepository) 
    {}
    async create(categoryDto: CategoryDto): Promise<{message: string}> {
        const category =  await this.categoryRepo.findAll();
        const exists = category.find((d)=> d.name.toLowerCase() === categoryDto.name.toLowerCase())
        if (exists){
            throw new BadRequestException('Category is already exists')
        }
        await this.categoryRepo.createCategory(categoryDto.name)
        return {message: "Category created successfully"}
    }
    async getCategoryWithSubcategory(){
        return this.categoryRepo.findCategoryWithSubcategory()
    }
    
}