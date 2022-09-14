import { User } from '../entities/user.entity';
import { InputType, OmitType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput extends OmitType(User, ['id'], InputType) {}
