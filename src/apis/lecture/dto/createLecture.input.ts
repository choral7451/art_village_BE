import { Field, InputType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreateLectureInput {
  @Field(() => Number)
  lecturer: number;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  tag?: string;

  @Field(() => Number)
  category: number;

  @Field(() => Number)
  subCategory: number;

  @Field(() => [String])
  subTitle: string[];

  @Field(() => [GraphQLUpload])
  files: FileUpload[];

  @Field(() => String)
  description: String;
}
