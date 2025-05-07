import { Injectable } from '@nestjs/common';
import { ProcesseCreateDto, ProcesseUpdateDto } from 'src/dtos/processes.dto';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import { DatabaseServiceInterface } from 'src/interfaces/service.interface';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class ProcessesService implements DatabaseServiceInterface {
  #db = PrismaSingleton.instance.client;
  async create(data: ProcesseCreateDto): Promise<any> {
    try {
      await this.#db.processes.create({ data });
      return { message: 'success' };
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
  async findAll(): Promise<any> {
    try {
      return await this.#db.processes.findMany();
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
  async findOne(id: number): Promise<any> {
    try {
      return await this.#db.processes.findUnique({ where: { id } });
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
  async delete(id: number): Promise<any> {
    try {
      await this.#db.processes.delete({ where: { id } });
      return { message: 'success' };
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
  async updateOne(id: number, data: ProcesseUpdateDto): Promise<any> {
    try {
      await this.#db.processes.update({ where: { id }, data });
      return { message: 'success' };
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
