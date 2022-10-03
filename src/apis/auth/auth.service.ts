import { Repository } from 'typeorm';
import {
  BadGatewayException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService, //
    private readonly userService: UserService,
  ) {}

  getAccessToken({ userData }) {
    try {
      return this.jwtService.sign(
        { email: userData.email, name: userData.name },
        { secret: process.env.ACCESS_KEY, expiresIn: '1h' },
      );
    } catch (err) {
      throw new BadGatewayException('AccessToken발급에 실패했습니다.');
    }
  }

  setRefreshToken({ userData, res }) {
    try {
      const refreshToken = this.jwtService.sign(
        { email: userData.email, name: userData.name },
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

  async accessTokenCheck({ accessToken }) {
    try {
      const checkToken = jwt.verify(accessToken, process.env.ACCESS_KEY);

      return {
        email: checkToken['email'],
        name: checkToken['name'],
        restTtl: checkToken['exp'] - Math.floor(Date.now() / 1000),
      };
    } catch (error) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
  }

  getEmailToken() {
    return String(Math.floor(Math.random() * 10 ** 6)).padStart(6, '0');
  }

  async refreshTokenCheck({ refreshToken }) {
    try {
      const result = jwt.verify(refreshToken, process.env.REFRESH_KEY);
      return {
        email: result['email'],
        name: result['name'],
        restTtl: result['exp'] - Math.floor(Date.now() / 1000),
      };
    } catch {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
  }
}
