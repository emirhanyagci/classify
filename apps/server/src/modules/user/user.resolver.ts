import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { User } from "./models/user.model";
import { UserService } from "./user.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../rest-auth/guards/gql-auth.guard";
import { UpdateUserInput } from "./dto/user.input";
import { CurrentUser } from "../rest-auth/decorators/current-user.decorator";


@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Query(() => User, { name: 'user' })
    @UseGuards(GqlAuthGuard)
    getUser(@CurrentUser() user: { userId: number }): Promise<User> {
        return this.userService.getUser(user.userId);
    }
    @Mutation(() => User)
    @UseGuards(GqlAuthGuard)
    updateUser(@Args('input') input: UpdateUserInput, @CurrentUser() user: { userId: number }): Promise<User> {
        return this.userService.updateUser(user.userId, input);
    }

}