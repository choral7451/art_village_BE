import {
  BadGatewayException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
    private readonly userService: UserService,
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
  async SendToken(@Args('email') email: string) {
    const user = await this.userService.findOne({ email });
    if (user) throw new BadGatewayException('이미 등록된 유저입니다.');
    return true;
  }
}
