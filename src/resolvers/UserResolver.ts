import {Resolver, Query, Arg, Mutation} from "type-graphql";
import { User } from "../entity/User";
import {CreateUserInput} from "../inputs/user/CreateUserInput";
import {UpdateUserInput} from "../inputs/user/UpdateUserInput";


@Resolver()
export class UserResolver {
    @Query(() => [User])
    users(): Promise<User[]> {
        return User.find();
    }

    @Query(() => User)
    user(@Arg("id") id:number) {
        return User.findOne({ where: { id: id } });
    }
    @Mutation(() => User)
     async createUser( @Arg("data") data: CreateUserInput) {
        const user = User.create(data);
        await user.save();
        return user;
    }
    @Mutation(() => User)
    async updateUser(@Arg("id") id: number, @Arg("data") data: UpdateUserInput) {
        const user = await User.findOne({ where: { id: id } });
        if (!user) {
            throw new Error("User not found");
        }
        Object.assign(user, data);
        await user.save();
        return user;
    }
    @Mutation(() => Boolean)
    async deleteUser(@Arg("id") id: number) {
        const user = await User.findOne({ where: { id: id } });
        if (!user) {
            throw new Error("User not found");
        }
        await user.remove();
        return true;
    }
}