import { Module } from '@nestjs/common';
import { LectureResolver } from './lecture.resolver';
import { LectureService } from './lecture.service';

@Module({
  imports: [],
  providers: [LectureResolver, LectureService],
})
export class LectureModule {}
