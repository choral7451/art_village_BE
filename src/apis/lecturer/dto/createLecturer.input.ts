import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreateLecturerInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  email: String;

  @Field(() => [GraphQLUpload])
  image: FileUpload[];

  @Field(() => String)
  profile: String;
}
