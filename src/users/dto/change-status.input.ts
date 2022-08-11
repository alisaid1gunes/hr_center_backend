import { StatusEnum } from "./status.enum";
import { IsEnum, IsNumber } from "class-validator";
import { Field, InputType } from "type-graphql";
@InputType()
export class ChangeStatusInput {
  @Field()
  @IsNumber()
  id: number;
  @Field()
  @IsEnum(StatusEnum)
  status: StatusEnum;
}
