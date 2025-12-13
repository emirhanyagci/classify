import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from "./dto/auth.dto";
import { UserService } from "../user/user.service";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) { }
    async validateUser(email: string, password: string): Promise<any> {
        return this.userService.validateUser(email, password);
    }
    async login(user: any) {
        const payload = { name: user.name, email: user.email, sub: user.id };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, {
                secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
                expiresIn: '7d',
            })]);
        return {
            accessToken, refreshToken
        };
    }
    async register(registerDto: RegisterDto) {

        const isExisting = await this.userService.findByEmail(registerDto.email);
        if (isExisting) {
            throw new BadRequestException('User already exists');
        }
        const user = await this.userService.createUser(registerDto);

        return user;

    }
    async veryifyUserRefreshToken(refreshToken: string, userId: number) {


        const decodedPayload = await this.jwtService.verifyAsync(refreshToken, {
            secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
        });

        if (!decodedPayload) {
            throw new ForbiddenException('Invalid refresh token');
        }
        const user = await this.userService.findById(decodedPayload.sub);

        if (!user) {
            throw new ForbiddenException('Invalid refresh token');
        }
        return user;
    }
}