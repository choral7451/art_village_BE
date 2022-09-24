import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { SubCategory } from './entities/subCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, SubCategory])],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
