import { Injectable } from '@nestjs/common';
import { ProcessCreateDto, ProcessUpdateDto } from 'src/dtos/processes.dto';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import { DatabaseServiceInterface } from 'src/interfaces/databaseService.interface';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class ProcessesService implements DatabaseServiceInterface {
  #db = PrismaSingleton.instance.client;
  async create(data: ProcessCreateDto) {
    try {
      await this.#db.processes.create({ data });
      return { message: 'success' };
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
  async findAll() {
    try {
      return await this.#db.processes.findMany();
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
  async findOne(id: number) {
    try {
      return await this.#db.processes.findUnique({
        where: { id },
        include: { sections: true },
      });
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
  async delete(id: number) {
    try {
      await this.#db.processes.delete({ where: { id } });
      return { message: 'success' };
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
  async updateOne(id: number, data: ProcessUpdateDto) {
    try {
      await this.#db.processes.update({ where: { id }, data });
      return { message: 'success' };
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
