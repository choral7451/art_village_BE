import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LectureService } from './lecture.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
export class LectureResolver {
  constructor(
    private readonly lectureService: LectureService, //
  ) {}

  @Mutation(() => [String])
  createLecture(
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[],
  ) {
    return this.lectureService.createMulti({ files });
  }
}
