import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CvParseResponse {
  @Field({ nullable: true })
  firstName: string;
  @Field({ nullable: true })
  lastName: string;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  phone: string;
  @Field({ nullable: true })
  address: string;
  @Field({ nullable: true })
  jobTitle: string;
}
