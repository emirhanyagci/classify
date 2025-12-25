import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { UserController } from "./user.controller";
import { AwsS3Service } from "../aws/aws-s3.service";

@Module({
    controllers: [UserController],
    providers: [UserService, UserResolver, AwsS3Service],
    exports: [UserService],
})
export class UserModule { }
