import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";

import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

import { Service } from "typedi";
@Service()
@Resolver()
export class UserResolver {
  constructor(
    // constructor injection of service
    private readonly userService: UserService
  ) {}
  @Query(() => [User])
  async users(
    @Arg("take") take: number,
    @Arg("page") page: number,
    @Arg("search") search: string
  ): Promise<User[]> {
    return await this.userService.getUsers(take, page, search);
  }

  @Query(() => Number)
  async usersCount(): Promise<number> {
    return await this.userService.getUsersCount();
  }

  @Query(() => Number)
  async usersFemaleCount(): Promise<number> {
    return await this.userService.getUsersFemaleCount();
  }

  @Query(() => Number)
  async usersMaleCount(): Promise<number> {
    return await this.userService.getUsersMaleCount();
  }

  @Query(() => Number)
  async usersAvgAge(): Promise<number> {
    return await this.userService.getUsersAvgAge();
  }

  @Query(() => User)
  async user(@Arg("id") id: number) {
    return await this.userService.getUser(id);
  }

  @Mutation(() => User)
  async createUser(
    @Arg("data") data: CreateUserInput,
    @Arg("file", () => GraphQLUpload) file: FileUpload
  ) {
    return await this.userService.createUser(data, file);
  }
  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: number,
    @Arg("data") data: UpdateUserInput,
    @Arg("file", () => GraphQLUpload, { nullable: true }) file: FileUpload
  ) {
    return await this.userService.updateUser(id, data, file);
  }
  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: number) {
    await this.userService.deleteUser(id);
    return true;
  }
}
