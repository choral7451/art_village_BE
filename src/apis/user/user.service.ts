import * as bcrypt from 'bcrypt';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { DateService } from 'src/commons/date/date.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly dateService: DateService,
  ) {}

  async create({ createUserInput }) {
    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);

    try {
      await this.userRepository.save({
        ...createUserInput,
        createdAt: this.dateService.getDate(),
      });

      return true;
    } catch (err) {
      throw new BadGatewayException('회원가입에 실패했습니다.');
    }
  }

  async findOne({ email }) {
    return this.userRepository.findOne({ where: { email } });
  }

  async findAll() {
    return this.userRepository.find();
  }
}
