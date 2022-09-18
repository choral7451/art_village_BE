import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { CreateUserInput } from './dto/createUser.input';
import { FetchUser } from './dto/fetchUser.output';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => Boolean)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput, //
  ) {
    return this.userService.create({ createUserInput });
  }

  @Query(() => FetchUser)
  async fetchLoginUser(
    @Context() context: any, //
  ) {
    const accessToken = context.req.headers.authorization.split(' ')[1];
    const user = await this.authService.accessTokenCheck({ accessToken });

    return user;
  }
}
