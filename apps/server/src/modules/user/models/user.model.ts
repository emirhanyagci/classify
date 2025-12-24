import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
    @Field(() => ID)
    id: number;

    @Field()
    name: string;

    @Field()
    passwordHash: string;

    @Field()
    email: string;

    @Field()
    imageUrl: string;

    @Field()
    createdAt: Date;
}