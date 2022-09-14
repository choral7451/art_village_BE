import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}

  @Mutation(() => Boolean)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput, //
  ) {
    return this.userService.create({ createUserInput });
  }
}
