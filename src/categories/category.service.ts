import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { Category } from "./entities/category.entity";
import { CreateCategoryInput } from "./dto/create-category.input";
import { UpdateCategoryInput } from "./dto/update-category.input";

@Service()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  public async getCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  public async getCategory(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  }
  public async createCategory(
    createCategoryInput: CreateCategoryInput
  ): Promise<Category> {
    return await this.categoryRepository.save(createCategoryInput);
  }
  public async updateCategory(
    id: number,
    updateCategoryInput: UpdateCategoryInput
  ): Promise<Category> {
    const categoryToUpdate = await this.categoryRepository.findOne(id);
    if (!categoryToUpdate) {
      throw new Error("Category not found");
    }
    Object.assign(categoryToUpdate, updateCategoryInput);
    return await this.categoryRepository.save(categoryToUpdate);
  }
  public async deleteCategory(id: number): Promise<boolean> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new Error("Category not found");
    }
    await this.categoryRepository.remove(category);
    return true;
  }
}
