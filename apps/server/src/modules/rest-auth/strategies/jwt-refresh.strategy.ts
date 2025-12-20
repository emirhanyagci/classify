import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { JwtPayload } from '@classify/common';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(
        configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request.cookies?.Refresh,
            ]),
            secretOrKey: configService.getOrThrow('JWT_REFRESH_SECRET'),
            passReqToCallback: true,
        });
    }

    async validate(request: Request, payload: JwtPayload) {
        return this.authService.veryifyUserRefreshToken(
            request.cookies?.Refresh,
            payload.sub,
        );
    }
}