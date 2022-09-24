import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './apis/auth/auth.module';
import { UserModule } from './apis/user/user.module';
import { LectureModule } from './apis/lecture/lecture.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './apis/file/file.module';
import { CategoryModule } from './apis/category/category.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    FileModule,
    LectureModule,
    CategoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: 'http://localhost:3001',
        credentials: true,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'art_village_database',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'artVillage',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://artVillage-redis:6379',
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
