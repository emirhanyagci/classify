import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum ClassRole {
    TEACHER = 'teacher',
    ASSISTANT = 'assistant',
    STUDENT = 'student',
}

registerEnumType(ClassRole, {
    name: 'ClassRole',
    description: 'The role of a user in a class',
});

@ObjectType()
export class Class {
    @Field(() => ID)
    id: number;

    @Field()
    publicId: string;

    @Field()
    joinCode: string;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    ownerId: number;

    @Field()
    createdAt: Date;
}

@ObjectType()
export class ClassMember {
    @Field(() => ID)
    id: number;

    @Field()
    classId: number;

    @Field()
    userId: number;

    @Field(() => ClassRole)
    role: ClassRole;

    @Field()
    enrolledAt: Date;
}

