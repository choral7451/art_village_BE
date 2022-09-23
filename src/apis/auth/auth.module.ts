import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateService } from 'src/commons/date/date.service';
import { RedisService } from 'src/commons/redis/redis.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([User])],
  providers: [
    AuthService,
    UserService,
    AuthResolver,
    RedisService,
    DateService,
  ],
})
export class AuthModule {}
