import { InputType, Field } from "type-graphql";
import {BaseEntity} from "typeorm";

@InputType()
export class UpdateUserInput extends BaseEntity{
    @Field({nullable:true})
    firstName: string;

    @Field({nullable:true})
    lastName: string;

    @Field({nullable:true})
    age: number;

    @Field({nullable:true})
    email: string;

    @Field({nullable:true})
    phone: string;

    @Field({nullable:true})
    address: string;

    @Field({nullable:true})
    city: string;

    @Field({nullable:true})
    country: string;

    @Field({nullable:true})
    jobTitle: string;

    @Field({nullable:true})
    salaryExpectation: number;

    @Field({nullable:true})
    cv: string;
    
    @Field({nullable:true})
    applicationStatus: string;
    
    @Field({nullable:true})
    gender: string;
}
