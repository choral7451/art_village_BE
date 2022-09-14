import { Repository } from 'typeorm';
import {
  BadGatewayException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService, //
    private readonly userService: UserService,
  ) {}

  getAccessToken({ user }) {
    try {
      return this.jwtService.sign(
        { email: user.email, name: user.name },
        { secret: process.env.ACCESS_KEY, expiresIn: '1h' },
      );
    } catch (err) {
      throw new BadGatewayException('AccessToken발급에 실패했습니다.');
    }
  }

  setRefreshToken({ res }) {
    try {
      const refreshToken = this.jwtService.sign(
        {},
        {
          secret: process.env.REFRESH_KEY,
          expiresIn: '2w',
        },
      );

      res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
      return true;
    } catch (err) {
      throw new BadGatewayException('RefreshToken발급에 실패했습니다.');
    }
  }
}
