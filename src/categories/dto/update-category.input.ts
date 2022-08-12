import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateCategoryInput {
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  description: string;
}
