import { Args, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { SubCategory } from './entities/subCategory.entity';

@Resolver()
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService, //
  ) {}

  @Query(() => [Category])
  fetchCategory() {
    return this.categoryService.findAllCategory();
  }

  @Query(() => [SubCategory])
  fetchSubCategory(@Args('num') num: number) {
    return this.categoryService.findAllSubCategory({ num });
  }
}
