import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  /*  create(category: CategoryEntity) {
    return this.categoryRepository.save(category);
  } */

  async create(category: CreateCategoryDto): Promise<any> {
    await this.categoryRepository.save(category);
    return await this.findOne(category.id);
  }

  findAll() {
    return this.categoryRepository.manager
      .getTreeRepository(CategoryEntity)
      .findTrees();
  }

  findOne(id: number) {
    return this.categoryRepository.find({
      where: { id },
      relations: [
        'categories',
        'categories.categories',
        'categories.categories.categories',
      ], // Only one level of querying is working
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
