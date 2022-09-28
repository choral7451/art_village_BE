import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DateService } from 'src/commons/date/date.service';
import { CategoryService } from '../category/category.service';
import { FileService } from '../file/file.service';
import { VideoService } from '../video/video.service';
import { CreateLectureInput } from './dto/createLecture.input';
import { Lecture } from './entities/lecture.entity';
import { LectureService } from './lecture.service';

@Resolver()
export class LectureResolver {
  constructor(
    private readonly lectureService: LectureService, //
    private readonly fileService: FileService,
    private readonly dateService: DateService,
    private readonly videoService: VideoService,
    private readonly categoryService: CategoryService,
  ) {}

  @Query(() => [Lecture])
  fetchLecture() {
    return this.lectureService.findAll();
  }

  @Mutation(() => Boolean)
  async createLecture(
    @Args('createLectureInput') createLectureInput: CreateLectureInput,
  ) {
    const files = await this.fileService.createMulti({
      files: createLectureInput.files,
    });

    const lecture = {
      lecturer: createLectureInput.lecturer,
      title: createLectureInput.title,
      category: createLectureInput.category,
      subCategory: createLectureInput.subCategory,
      image: files[0],
      introduce: files[1],
      description: createLectureInput.description,
      createdAt: this.dateService.getDate(),
    };

    const lectureId = await this.lectureService.create({ lecture });

    if (files.length > 1) {
      Promise.all(
        files.slice(1).map(async (el, idx) => {
          const video = {
            index: idx,
            url: el,
            lecture: lectureId,
            title: createLectureInput.subTitle[idx],
          };
          return await this.videoService.create({ video });
        }),
      );

      return true;
    }

    return true;
  }
}
