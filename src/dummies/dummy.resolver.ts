import { Resolver, Mutation } from "type-graphql";
import { User } from "../users/entities/user.entity";

import { DummyService } from "./dummy.service";

import { Service } from "typedi";

@Service()
@Resolver()
export class DummyResolver {
  constructor(private readonly dummyService: DummyService) {}
  @Mutation(() => [User])
  async createDummyUsers() {
    await this.dummyService.createDummyUsers();
  }
}
