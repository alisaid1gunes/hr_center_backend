import { User } from "./entities/user.entity";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ILike, Repository } from "typeorm";
import { FileUpload } from "graphql-upload";
import { CreateUserInput } from "./dto/create-user.input";
import { uploadToCloudinary } from "../utils/uploadHandler";
import { UpdateUserInput } from "./dto/update-user.input";
import { Service } from "typedi";

@Service()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  public async getUsers(
    take: number,
    page: number,
    search: string
  ): Promise<User[]> {
    return await this.userRepository.find({
      where: [
        { firstName: ILike(`%${search}%`) },
        { lastName: ILike(`%${search}%`) },
        { jobTitle: ILike(`%${search}%`) },
      ],
      take: take,
      skip: take * page,
      order: {
        createdAt: "DESC",
      },
    });
  }

  public async getUsersCount(): Promise<number> {
    return await this.userRepository.count();
  }

  public async getUsersFemaleCount(): Promise<number> {
    return await this.userRepository.count({
      where: {
        gender: "Female",
      },
    });
  }

  public async getUsersMaleCount(): Promise<number> {
    return await this.userRepository.count({
      where: {
        gender: "Male",
      },
    });
  }

  public async getUsersAvgAge(): Promise<number> {
    const { avg } = await this.userRepository
      .createQueryBuilder("user")
      .select("AVG(user.age)", "avg")
      .getRawOne();
    return avg;
  }

  public async getUser(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  public async createUser(
    data: CreateUserInput,
    file: FileUpload
  ): Promise<User> {
    const { url } = await uploadToCloudinary(file);

    const user = this.userRepository.create({ ...data, cv: url });
    if (url) {
      await this.userRepository.save(user);
    }
    return user;
  }

  public async updateUser(
    id: number,
    data: UpdateUserInput,
    file: FileUpload
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new Error("User not found");
    }
    if (file) {
      const { url } = await uploadToCloudinary(file);
      user.cv = url;
    }
    Object.assign(user, data);
    await this.userRepository.save(user);
    return user;
  }

  public async deleteUser(id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new Error("User not found");
    }
    await this.userRepository.remove(user);
    return true;
  }
}
