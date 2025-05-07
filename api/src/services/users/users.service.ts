import { Injectable } from '@nestjs/common';
import PrismaSingleton from '../../singletons/prisma-singleton/prisma-singleton';
import { Prisma } from '../../../prisma/generated/client';
import { UserCreateDto } from 'src/dtos/users.dto';

@Injectable()
export class UsersService {
  #db = PrismaSingleton.instance.client;

  async create(data: UserCreateDto) {
    await this.#db.users.create({ data });
    return { message: 'success' };
  }
  async findAll() {
    return await this.#db.users.findMany();
  }
  async findOne(username: string) {
    return await this.#db.users.findUnique({ where: { username: username } });
  }

  async updateOne(id: string, data: Prisma.usersUpdateInput) {
    await this.#db.users.update({ where: { id }, data: data });
    return { message: 'success' };
  }
  async delete(id: string) {
    await this.#db.users.delete({ where: { id } });
    return { message: 'success' };
  }
}
