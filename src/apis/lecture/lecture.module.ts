import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateService } from 'src/commons/date/date.service';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/entities/category.entity';
import { SubCategory } from '../category/entities/subCategory.entity';
import { FileService } from '../file/file.service';
import { Video } from '../video/entities/video.entity';
import { VideoService } from '../video/video.service';
import { Lecture } from './entities/lecture.entity';
import { LectureResolver } from './lecture.resolver';
import { LectureService } from './lecture.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lecture, Video, Category, SubCategory])],
  providers: [
    LectureResolver,
    LectureService,
    FileService,
    DateService,
    VideoService,
    CategoryService,
  ],
})
export class LectureModule {}
