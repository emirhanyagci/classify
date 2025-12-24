import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DbModule } from './modules/db/db.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/rest-auth/auth.module';
import { ClassesModule } from './modules/classes/classes.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    AuthModule,
    UserModule,
    ClassesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(__dirname, 'schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault()
      ],
    }),
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
