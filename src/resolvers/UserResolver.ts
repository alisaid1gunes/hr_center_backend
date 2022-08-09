import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { User } from "../entity/User";
import { CreateUserInput } from "../inputs/user/CreateUserInput";
import { UpdateUserInput } from "../inputs/user/UpdateUserInput";
import { uploadToCloudinary } from "../utils/uploadHandler";
//import * as pdf from "pdf-parse";

import { ILike } from "typeorm";
import { AppDataSource } from "../data-source";
import { CvParserService } from "../services/CvParserService";
import { CvParseResponse } from "./CvParseResponse";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users(
    @Arg("take") take: number,
    @Arg("page") page: number,
    @Arg("search") search: string
  ): Promise<User[]> {
    return User.find({
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

  @Query(() => Number)
  async usersCount(): Promise<number> {
    return await User.count();
  }

  @Query(() => Number)
  async usersFemaleCount(): Promise<number> {
    return await User.count({
      where: {
        gender: "Female",
      },
    });
  }

  @Query(() => Number)
  async usersMaleCount(): Promise<number> {
    return await User.count({
      where: {
        gender: "Male",
      },
    });
  }

  @Query(() => Number)
  async usersAvgAge(): Promise<number> {
    const { avg } = await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .select("AVG(user.age)", "avg")
      .getRawOne();
    return avg;
  }

  @Query(() => User)
  user(@Arg("id") id: number) {
    return User.findOne({ where: { id: id } });
  }
  @Mutation(() => User)
  async createUser(
    @Arg("data") data: CreateUserInput,
    @Arg("file", () => GraphQLUpload) file: FileUpload
  ) {
    const { url } = await uploadToCloudinary(file);

    const user = User.create({ ...data, cv: url });
    if (url) {
      await user.save();
    }
    return user;
  }
  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: number,
    @Arg("data") data: UpdateUserInput,
    @Arg("file", () => GraphQLUpload, { nullable: true }) file: FileUpload
  ) {
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      throw new Error("User not found");
    }
    if (file) {
      const { url } = await uploadToCloudinary(file);
      user.cv = url;
    }
    Object.assign(user, data);
    await user.save();
    return user;
  }
  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: number) {
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      throw new Error("User not found");
    }
    await user.remove();
    return true;
  }

  @Mutation(() => CvParseResponse)
  async parsePdf(@Arg("file", () => GraphQLUpload) file: FileUpload) {
    const CvParser = new CvParserService(file);

    return await CvParser.parseAll();
  }
}
