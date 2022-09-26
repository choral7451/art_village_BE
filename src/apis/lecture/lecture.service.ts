import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lecture } from './entities/lecture.entity';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture)
    private readonly lectureRepository: Repository<Lecture>,
  ) {}

  async create({ lecture }) {
    const result = await this.lectureRepository.save({ ...lecture });

    return result.id;
  }

  async findAll() {
    return await this.lectureRepository.find({
      relations: ['category', 'subCategory', 'lecturer'],
    });
  }
}
