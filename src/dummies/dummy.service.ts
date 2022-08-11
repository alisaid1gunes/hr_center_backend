import { User } from "../users/entities/user.entity";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { faker } from "@faker-js/faker";

import { Service } from "typedi";

@Service()
export class DummyService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  public async createDummyUsers(): Promise<User[]> {
    const users = [];
    const applicationStatus = ["Application", "Call", "Interview", "Offer"];
    for (let i = 0; i < 3000; i++) {
      const user = this.userRepository.create({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: Math.floor(Math.random() * (60 - 18 + 1)) + 18,
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        country: faker.address.country(),
        jobTitle: faker.name.jobTitle(),
        salaryExpectation:
          Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000,
        cv: "cv/4a1c463fdd286a9d16ced63f3c9d75/4a1c463fdd286a9d16ced63f3c9d75",
        gender: faker.name.gender(true),
        applicationStatus:
          applicationStatus[
            Math.floor(Math.random() * applicationStatus.length)
          ],
      });

      await this.userRepository.save(user);
      users.push(user);
    }
    return users;
  }
}
