import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from '../file/file.service';
import { Lecturer } from './entities/lecturer.entity';
import { LecturerResolver } from './lecturer.resolver';
import { LecturerService } from './lecturer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lecturer])],
  providers: [LecturerResolver, LecturerService, FileService],
})
export class LecturerModule {}
