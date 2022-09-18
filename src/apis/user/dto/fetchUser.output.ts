import { User } from '../entities/user.entity';
import { ObjectType, OmitType } from '@nestjs/graphql';

@ObjectType()
export class FetchUser extends OmitType(User, ['id', 'password'], ObjectType) {}
