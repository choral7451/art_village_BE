import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { SubCategory } from './entities/subCategory.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
  ) {}

  async findAllCategory() {
    return await this.categoryRepository.find({
      relations: ['subCategory'],
    });
  }

  async findAllSubCategory({ num }) {
    return await this.subCategoryRepository.find({
      where: {
        category: num,
      },
    });
  }

  async findOneCategory({ name }) {
    return await this.categoryRepository.findOne({
      where: { name },
    });
  }

  async findOneSubCategory({ name }) {
    return await this.subCategoryRepository.findOne({
      where: { name },
    });
  }

  async createCategory({ category }) {
    const result = await this.categoryRepository.save({ ...category });

    return result.id;
  }

  async createSubCategory({ subCategory }) {
    await this.subCategoryRepository.save({ ...subCategory });

    return true;
  }
}
