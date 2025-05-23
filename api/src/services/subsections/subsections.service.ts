import { Injectable } from '@nestjs/common';
import {
  SubsectionCreateDto,
  SubsectionUpdateDto,
} from 'src/dtos/subsections.dto';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import { DatabaseServiceInterface } from 'src/interfaces/databaseService.interface';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class SubsectionsService implements DatabaseServiceInterface {
  #db = PrismaSingleton.instance.client;

  async create(data: SubsectionCreateDto) {
    try {
      await this.#db.subsections.create({ data });
      return { message: 'success' };
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
  async findAll(where?: { section_id: number }) {
    try {
      return await this.#db.subsections.findMany({ where });
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
  async findOne(id: number) {
    try {
      return await this.#db.subsections.findUnique({ where: { id } });
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
  async updateOne(id: number, data: SubsectionUpdateDto) {
    try {
      await this.#db.subsections.update({ where: { id }, data });
      return { message: 'success' };
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
  async delete(id: number) {
    try {
      await this.#db.subsections.delete({ where: { id } });
      return { message: 'success' };
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
