import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DbModule } from './modules/db/db.module';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    DbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
