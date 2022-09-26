import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileService } from '../file/file.service';
import { CreateLecturerInput } from './dto/createLecturer.input';
import { Lecturer } from './entities/lecturer.entity';
import { LecturerService } from './lecturer.service';

@Resolver()
export class LecturerResolver {
  constructor(
    private readonly lecturerService: LecturerService, //
    private readonly fileService: FileService,
  ) {}

  @Query(() => [Lecturer])
  findLecturer(
    @Args('name') name: string, //
  ) {
    return this.lecturerService.findOne({ name });
  }

  @Query(() => [Lecturer])
  fetchLecturers() {
    return this.lecturerService.findAll();
  }

  @Mutation(() => Boolean)
  async createLecturer(
    @Args('createLecturerInput') createLecturerInput: CreateLecturerInput,
  ) {
    const result = await this.fileService.createMulti({
      files: createLecturerInput.image,
    });

    const { image, ...rest } = createLecturerInput;

    const data = {
      ...rest,
      image: result[0],
    };

    await this.lecturerService.create({ data });
    return true;
  }
}
