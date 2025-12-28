import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Class } from './models/class.model';
import { ClassesService } from './classes.service';
import { CreateClassInput, UpdateClassInput } from './dto/class.input';
import { GqlAuthGuard } from '../rest-auth/guards/gql-auth.guard';
import { CurrentUser } from '../rest-auth/decorators/current-user.decorator';

@Resolver(() => Class)
export class ClassesResolver {
    constructor(private readonly classesService: ClassesService) { }

    @UseGuards(GqlAuthGuard)
    @Query(() => [Class], { name: 'classes' })
    findAll(): Promise<Class[]> {
        return this.classesService.findAll();
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Class, { name: 'class' })
    findOne(@Args('publicId', { type: () => String }) publicId: string): Promise<Class> {
        return this.classesService.findByPublicId(publicId);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Class, { name: 'classByJoinCode' })
    findByJoinCode(@Args('joinCode', { type: () => String }) joinCode: string): Promise<Class> {
        return this.classesService.findByJoinCode(joinCode);
    }

    @Query(() => [Class], { name: 'myClasses' })
    @UseGuards(GqlAuthGuard)
    findMyClasses(@CurrentUser() user: { userId: number }): Promise<Class[]> {
        return this.classesService.findByOwner(user.userId);
    }

    @Mutation(() => Class)
    @UseGuards(GqlAuthGuard)
    createClass(
        @Args('input') input: CreateClassInput,
        @CurrentUser() user: { userId: number }
    ): Promise<Class> {
        return this.classesService.create(input, user.userId);
    }

    @Mutation(() => Class)
    @UseGuards(GqlAuthGuard)
    updateClass(
        @Args('input') input: UpdateClassInput,
        @CurrentUser() user: { userId: number }
    ): Promise<Class> {
        return this.classesService.update(input, user.userId);
    }

    @Mutation(() => Class)
    @UseGuards(GqlAuthGuard)
    regenerateJoinCode(
        @Args('id', { type: () => Int }) id: number,
        @CurrentUser() user: { userId: number }
    ): Promise<Class> {
        return this.classesService.regenerateJoinCode(id, user.userId);
    }

    @Mutation(() => Boolean)
    @UseGuards(GqlAuthGuard)
    deleteClass(
        @Args('id', { type: () => Int }) id: number,
        @CurrentUser() user: { userId: number }
    ): Promise<boolean> {
        return this.classesService.delete(id, user.userId);
    }
}
