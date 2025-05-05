import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { env } from 'process';
import PrismaSingleton from '../../singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  #database = PrismaSingleton.instance.client;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) {
      throw new BadRequestException('Token jwt não fornecido');
    }

    try {
      const dbVerify = await this.#database.users.findUnique({
        where: { accessToken: token },
        select: { tokenExpiration: true },
      });

      if (!dbVerify?.tokenExpiration) {
        throw new Error('jwt invalid');
      }
      if (dbVerify.tokenExpiration <= new Date(Date.now())) {
        throw new Error('jwt expired');
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new UnauthorizedException(error.message);
    }

    try {
      const payload: { [key: string]: any } = await this.jwtService.verifyAsync(
        token,
        { secret: env.JWT_SECRET },
      );
      request['user'] = payload;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new UnauthorizedException(error.message);
    }
    return true;
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
