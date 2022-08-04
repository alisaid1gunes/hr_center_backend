import {Resolver,  Mutation} from "type-graphql";
import { User } from "../entity/User";
import {faker} from "@faker-js/faker";



@Resolver()
export class DummyResolver {


    @Mutation(() => [User])
    async createDummyUsers() {
        const users = [];
        for (let i = 0; i < 3000; i++) {
            const user = User.create({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                age: Math.floor(Math.random() * (60 - 18 + 1)) + 18,
                email: faker.internet.email(),
                phone: faker.phone.number(),
                address: faker.address.streetAddress(),
                city: faker.address.city(),
                country: faker.address.country(),
                jobTitle: faker.name.jobTitle(),
                salaryExpectation: Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000,
                cv: 'cv/4a1c463fdd286a9d16ced63f3c9d75/4a1c463fdd286a9d16ced63f3c9d75',
                gender: faker.name.gender(true),
            });
            await user.save();
            users.push(user)
        }



        return users;
    }

}