import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lecturer } from './entities/lecturer.entity';

@Injectable()
export class LecturerService {
  constructor(
    @InjectRepository(Lecturer)
    private readonly lecturerRepository: Repository<Lecturer>,
  ) {}

  async findOne({ name }) {
    return await this.lecturerRepository
      .createQueryBuilder()
      .where('name LIKE :name')
      .setParameter('name', `%${name.trim()}%`)
      .getMany();
  }

  async findAll() {
    return await this.lecturerRepository.find();
  }

  async create({ data }) {
    await this.lecturerRepository.save({ ...data });
  }
}
