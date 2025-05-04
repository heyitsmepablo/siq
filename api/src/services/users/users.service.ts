import { Injectable } from '@nestjs/common';
import PrismaSingleton from '../../singletons/prisma-singleton/prisma-singleton';
import { Prisma } from 'prisma/generated/client';

@Injectable()
export class UsersService {
  #db = PrismaSingleton.instance.client;

  async findOne(username: string) {
    return await this.#db.users.findUnique({ where: { username: username } });
  }

  async updateOne(id: string, data: Prisma.usersUpdateInput) {
    return await this.#db.users.update({ where: { id }, data: data });
  }
}
