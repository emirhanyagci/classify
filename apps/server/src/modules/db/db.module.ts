import { Global, Module } from '@nestjs/common';
import { Pool } from 'pg';
@Global()
@Module({
    controllers: [],
    providers: [
        {
            provide: "PG_POOL",
            useFactory: () => {
                return new Pool({
                    host: 'localhost',
                    port: 5432,
                    database: 'app',
                    user: 'app',
                    password: 'app',
                })
            }
        }
    ],
    exports: [
        "PG_POOL",
    ]

})
export class DbModule { }

// TODO : you can convert this variables to environment variables