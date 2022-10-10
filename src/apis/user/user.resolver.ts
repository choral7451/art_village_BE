import { InternalServerErrorException } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { RedisService } from 'src/commons/redis/redis.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserInput } from './dto/createUser.input';
import { FetchUser } from './dto/fetchUser.output';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
    private readonly authService: AuthService,
    private readonly redisService: RedisService,
  ) {}

  @Query(() => FetchUser)
  async fetchLoginUser(
    @Context() context: any, //
  ) {
    try {
      const accessToken = context.req.headers.authorization.split(' ')[1];
      const logout = await this.redisService.fetch({ key: accessToken });

      if (logout) {
        throw new InternalServerErrorException('로그아웃 처리된 토큰입니다.');
      }

      return await this.authService.accessTokenCheck({ accessToken });
    } catch (error) {
      throw new InternalServerErrorException('올바르지 않은 토큰입니다.');
    }
  }

  @Query(() => [User])
  async fetchUsers() {
    return await this.userService.findAll();
  }

  @Mutation(() => Boolean)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput, //
  ) {
    return this.userService.create({ createUserInput });
  }
}
