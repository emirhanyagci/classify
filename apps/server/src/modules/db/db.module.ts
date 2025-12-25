import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Global()
@Module({
    controllers: [],
    providers: [
        {
            provide: "PG_POOL",
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return new Pool({
                    host: configService.get<string>('DB_HOST', 'localhost'),
                    port: configService.get<number>('DB_PORT', 5432),
                    database: configService.get<string>('DB_NAME', 'app'),
                    user: configService.get<string>('DB_USER', 'app'),
                    password: configService.get<string>('DB_PASSWORD', 'app'),
                })
            }
        }
    ],
    exports: [
        "PG_POOL",
    ]
})
export class DbModule { }