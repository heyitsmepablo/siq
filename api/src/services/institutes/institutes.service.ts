import { Injectable } from '@nestjs/common';
import PrismaSingleton from '../../singletons/prisma-singleton/prisma-singleton';
import {
  InstituteCreateDto,
  InstituteUpdateDto,
} from '../../dtos/institutes.dto';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';

@Injectable()
export class InstitutesService {
  #db = PrismaSingleton.instance.client;

  async create(data: InstituteCreateDto) {
    try {
      await this.#db.institutes.create({ data });
      return { message: 'success' };
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
  async findAll() {
    try {
      return await this.#db.institutes.findMany();
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
  async findOne(id: number) {
    try {
      return await this.#db.institutes.findUnique({ where: { id } });
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
  async updateOne(id: number, data: InstituteUpdateDto) {
    try {
      await this.#db.institutes.update({ where: { id }, data: data });
      return { message: 'success' };
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
  async delete(id: number) {
    try {
      await this.#db.institutes.delete({ where: { id } });
      return { message: 'success' };
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
