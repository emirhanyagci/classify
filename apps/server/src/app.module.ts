import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DbModule } from './modules/db/db.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/rest-auth/auth.module';

@Module({
  imports: [
    AuthModule,
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   sortSchema: true,
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
