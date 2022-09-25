import { Args, Query, Resolver } from '@nestjs/graphql';
import { Lecturer } from './entities/lecturer.entity';
import { LecturerService } from './lecturer.service';

@Resolver()
export class LecturerResolver {
  constructor(
    private readonly lecturerService: LecturerService, //
  ) {}

  @Query(() => [Lecturer])
  fetchLecturer(
    @Args('name') name: string, //
  ) {
    return this.lecturerService.findOne({ name });
  }
}
