import {InputType, Field, Int} from "type-graphql";
import {BaseEntity} from "typeorm";

@InputType()
export class CreateUserInput extends BaseEntity{
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field(() => Int)
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

    @Field(() => Int)
    salaryExpectation: number;

    @Field({nullable:true})
    cv: string;
}