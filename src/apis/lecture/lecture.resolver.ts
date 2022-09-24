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

    const category = await this.categoryService.findOneCategory({
      name: createLectureInput.category,
    });

    const subCategory = await this.categoryService.findOneSubCategory({
      name: createLectureInput.subCategory,
    });

    const lecture = {
      lecturer: createLectureInput.lecturer,
      title: createLectureInput.title,
      category: category.id,
      subCategory: subCategory.id,
      image: files[0],
      preview: files[1],
      description: createLectureInput.description,
      createdAt: this.dateService.getDate(),
    };

    const lectureId = await this.lectureService.create({ lecture });

    if (files.length > 2) {
      Promise.all(
        files.slice(2).map(async (el, idx) => {
          const video = {
            index: idx + 1,
            url: el,
            lecture: lectureId,
          };
          return await this.videoService.create({ video });
        }),
      );

      return true;
    }

    return true;
  }
}
