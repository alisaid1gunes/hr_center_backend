import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,CreateDateColumn } from "typeorm";
import {Field, ObjectType} from "type-graphql";
@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number
    @Field()
    @Column()
    firstName: string
    @Field()
    @Column()
    lastName: string
    @Field()
    @Column()
    age: number
    @Field()
    @Column()
    email: string
    @Field()
    @Column()
    phone: string
    @Field()
    @Column()
    address: string
    @Field()
    @Column()
    city: string
    @Field()
    @Column()
    country: string
    @Field()
    @Column()
    jobTitle: string
    @Field()
    @Column()
    salaryExpectation: number
    @Field({nullable:true})
    @Column({nullable:true})
    cv: string

    @Field()
    @CreateDateColumn({nullable:true})
    createdAt: Date


}
