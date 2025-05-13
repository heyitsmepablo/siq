import { Injectable } from '@nestjs/common';
import { SectionCreateDto, SectionUpdateDto } from 'src/dtos/sections.dto';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import { DatabaseServiceInterface } from 'src/interfaces/databaseService.interface';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class SectionsService implements DatabaseServiceInterface {
  #db = PrismaSingleton.instance.client;
  async create(data: SectionCreateDto) {
    try {
      await this.#db.sections.create({ data });
      return { message: 'success' };
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
  async findAll() {
    try {
      return await this.#db.sections.findMany();
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
  async findOne(id: number) {
    try {
      return await this.#db.sections.findUnique({ where: { id } });
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
  async updateOne(id: number, data: SectionUpdateDto) {
    try {
      await this.#db.sections.update({ where: { id }, data });
      return { message: 'success' };
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
  async delete(id: number) {
    try {
      await this.#db.sections.delete({ where: { id } });
      return { message: 'success' };
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
