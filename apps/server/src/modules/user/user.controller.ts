import { Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
import type { Request } from "express";
import { CurrentUser } from "../rest-auth/decorators/current-user.decorator";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('upload-avatar')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('avatar'))
    async uploadAvatar(
        @Req() req: Request,
        @CurrentUser() user: { userId: number },
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.userService.uploadAvatar(user.userId, file);
    }
}