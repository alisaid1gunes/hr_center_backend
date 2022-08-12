import { CategoryService } from "./category.service";
import { Service } from "typedi";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Category } from "./entities/category.entity";
import { CreateCategoryInput } from "./dto/create-category.input";
import { UpdateCategoryInput } from "./dto/update-category.input";
@Service()
@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return await this.categoryService.getCategories();
  }

  @Query(() => Category)
  async category(@Arg("id") id: number): Promise<Category> {
    return await this.categoryService.getCategory(id);
  }

  @Mutation(() => Category)
  async createCategory(
    @Arg("data") createCategoryInput: CreateCategoryInput
  ): Promise<Category> {
    return await this.categoryService.createCategory(createCategoryInput);
  }
  @Mutation(() => Category)
  async updateCategory(
    @Arg("id") id: number,
    @Arg("data") updateCategoryInput: UpdateCategoryInput
  ): Promise<Category> {
    return await this.categoryService.updateCategory(id, updateCategoryInput);
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg("id") id: number): Promise<boolean> {
    return await this.categoryService.deleteCategory(id);
  }
}
