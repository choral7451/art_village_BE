import {
  BadGatewayException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { RedisService } from 'src/commons/redis/redis.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
    private readonly userService: UserService,
    private readonly redisService: RedisService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: any,
  ) {
    const user = await this.userService.findOne({ email });
    if (!user)
      throw new UnprocessableEntityException(
        '해당 이메일이 존재하지 않습니다.',
      );

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');

    const refreshToken = this.authService.setRefreshToken({
      res: context.req.res,
    });

    if (refreshToken) {
      return this.authService.getAccessToken({ user });
    }
  }

  @Mutation(() => Boolean)
  async sendToken(@Args('email') email: string) {
    const user = await this.userService.findOne({ email });
    if (user) throw new BadGatewayException('이미 등록된 유저입니다.');

    const token = this.authService.getToken();
    console.log(token);
    await this.redisService.create({ key: token, value: token, ttl: 181 });

    return true;
  }

  @Mutation(() => Boolean)
  async checkToken(@Args('token') token: string) {
    const result = await this.redisService.fetch({ key: token });
    return result
      ? true
      : new UnauthorizedException('인증번호가 일치하지 않습니다.');
  }
}
