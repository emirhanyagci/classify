import { Field, InputType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateClassInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    description: string;
}

@InputType()
export class UpdateClassInput {
    @Field(() => ID)
    @IsNotEmpty()
    id: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    name?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    description?: string;
}

