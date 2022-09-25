import { Field, InputType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreateLectureInput {
  @Field(() => String)
  lecturer: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  category: string;

  @Field(() => String)
  subCategory: string;

  @Field(() => [String])
  subTitle: string[];

  @Field(() => [GraphQLUpload])
  files: FileUpload[];

  @Field(() => String)
  description: String;
}
