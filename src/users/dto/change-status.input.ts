import { IsNumber } from "class-validator";
import { Field, InputType } from "type-graphql";
@InputType()
export class ChangeStatusInput {
  @Field()
  @IsNumber()
  id: number;
  @Field()
  status: string;
}
