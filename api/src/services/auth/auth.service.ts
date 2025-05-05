/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PrismaClientKnownRequestError } from '../../../prisma/generated/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../../dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(data: LoginDto) {
    const { username, password } = data;
    try {
      const user = await this.usersService.findOne(username);

      if (user?.password !== password || !user) {
        throw new UnauthorizedException('Usuario ou senha incorreto');
      }

      const {
        password: _,
        tokenExpiration,
        accessToken,
        ...userPayload
      } = user;

      const token = await this.jwtService.signAsync(userPayload);

      const now = new Date();

      now.setHours(now.getHours() + 1);

      const expireIn = Math.floor(now.getTime() / 1000);

      const expireAt = new Date(now.toISOString());
      await this.usersService.updateOne(userPayload.id, {
        accessToken: token,
        tokenExpiration: expireAt,
        lastLogin: new Date(Date.now()).toISOString(),
      });
      return {
        token: token,
        tokenType: 'Bearer',
        expireAt: expireAt,
        expireIn: expireIn,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        user: userPayload,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(error);
      }
      throw error;
    }
  }
}
