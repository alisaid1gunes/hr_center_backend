import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { Category } from "./entities/category.entity";

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
  public async createCategory(category: Category): Promise<Category> {
    return await this.categoryRepository.save(category);
  }
  public async updateCategory(category: Category): Promise<Category> {
    return await this.categoryRepository.save(category);
  }
}
