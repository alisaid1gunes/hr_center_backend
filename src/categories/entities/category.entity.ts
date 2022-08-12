import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
@ObjectType()
@Entity()
export class Category {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;
  @Field()
  name: string;
  @Field({ nullable: true })
  description: string;
  @CreateDateColumn()
  createdAt: Date;
}
