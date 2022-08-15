import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;
  @Field({ description: "First name of the user" })
  @Column()
  firstName: string;
  @Field()
  @Column()
  lastName: string;
  @Field()
  @Column()
  age: number;
  @Field()
  @Column()
  email: string;
  @Field()
  @Column()
  phone: string;
  @Field()
  @Column()
  address: string;
  @Field()
  @Column()
  city: string;
  @Field()
  @Column()
  country: string;
  @Field()
  @Column()
  jobTitle: string;
  @Field()
  @Column()
  salaryExpectation: number;
  @Field({ nullable: true })
  @Column({ nullable: true })
  cv: string;

  @Field()
  @Column({ nullable: true })
  gender: string;

  @Field()
  @Column({ nullable: true, default: "Application" })
  applicationStatus: string;

  @Field()
  @CreateDateColumn({ nullable: true })
  createdAt: Date;
}
