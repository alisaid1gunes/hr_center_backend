import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CvParserResponse {
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
  @Field({ nullable: true })
  github: string;
  @Field({ nullable: true })
  linkedin: string;
}
