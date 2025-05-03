import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserCreateDto } from './dtos/users.dto';
import { PrismaClientKnownRequestError } from './prisma/generated/client/runtime/library';
import PrismaSingleton from './singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class AppService {
  #db = PrismaSingleton.instance.client;
  async newAccount(newUserData: UserCreateDto) {
    try {
      await this.#db.users.create({ data: newUserData });
      return { message: 'success' };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(error);
      }
      throw error;
    }
  }
}
