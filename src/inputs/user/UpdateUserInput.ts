import { InputType, Field } from "type-graphql";
import {BaseEntity} from "typeorm";

@InputType()
export class UpdateUserInput extends BaseEntity{
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    age: number;

    @Field()
    email: string;

    @Field()
    phone: string;

    @Field()
    address: string;

    @Field()
    city: string;

    @Field()
    country: string;

    @Field()
    jobTitle: string;

    @Field()
    salaryExpectation: number;
}