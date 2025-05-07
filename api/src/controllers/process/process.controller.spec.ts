import { Test, TestingModule } from '@nestjs/testing';
import { ProcessController } from './process.controller';
import { Prisma } from 'prisma/generated/client';
import { prismaMock } from 'src/__mock__/prisma-singleton';
import { ProcessesService } from 'src/services/processes/processes.service';
import { processesServiceMock } from 'src/__mock__/services/processes.service';
import prisma from 'src/database/prisma-client';

describe('ProcessController', () => {
  let controller: ProcessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessController],
      providers: [
        { provide: ProcessesService, useValue: processesServiceMock },
      ],
    }).compile();

    controller = module.get<ProcessController>(ProcessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  const prismaPayload: Prisma.processesGetPayload<true> = {
    id: 1,
    name: 'teste',
    type: 'teste',
    createdAt: null,
    updatedAt: null,
  };

  describe('create', () => {
    it('Deve resolver com o resultado no payload', async () => {
      const requestPayload = prismaPayload;
      const expectedResponse = [prismaPayload];
      processesServiceMock.create.mockResolvedValue([prismaPayload]);
      await expect(controller.create(requestPayload)).resolves.toEqual(
        expectedResponse,
      );
    });
    it('Deve rejeitar jogando o erro', async () => {
      const requestPayload = prismaPayload;
      const expectResponse = new Error('erro generico');
      processesServiceMock.create.mockRejectedValue(expectResponse);
      await expect(controller.create(requestPayload)).rejects.toEqual(
        expectResponse,
      );
    });
  });
  describe('findAll', () => {
    it('Deve resolver com o resultado no payload', async () => {
      const expectedResponse = [prismaPayload];
      processesServiceMock.findAll.mockResolvedValue(expectedResponse);
      await expect(controller.findAll()).resolves.toEqual(expectedResponse);
    });
    it('Deve rejeitar jogando o erro', async () => {
      const expectResponse = new Error('erro generico');
      processesServiceMock.findAll.mockRejectedValue(expectResponse);
      await expect(controller.findAll()).rejects.toEqual(expectResponse);
    });
  });
  describe('findOne', () => {
    it('Deve resolver com o resultado no payload', async () => {
      const expectedResponse = prismaPayload;
      processesServiceMock.findOne.mockResolvedValue(prismaPayload);
      await expect(controller.findOne(1)).resolves.toEqual(expectedResponse);
    });
    it('Deve rejeitar jogando o erro', async () => {
      const expectResponse = new Error('erro generico');
      processesServiceMock.findOne.mockRejectedValue(expectResponse);
      await expect(controller.findOne(1)).rejects.toEqual(expectResponse);
    });
  });
  describe('updateOne', () => {
    it('Deve resolver com o resultado no payload', async () => {
      const expectedResponse = { message: 'success' };
      const requestPayload = prismaPayload;
      processesServiceMock.updateOne.mockResolvedValue(expectedResponse);
      await expect(controller.updateOne(1, requestPayload)).resolves.toEqual(
        expectedResponse,
      );
    });
    it('Deve rejeitar jogando o erro', async () => {
      const expectResponse = new Error('erro generico');
      processesServiceMock.updateOne.mockRejectedValue(expectResponse);
      await expect(controller.updateOne(1, {})).rejects.toEqual(expectResponse);
    });
  });
  describe('delete', () => {
    it('Deve resolver com o resultado no payload', async () => {
      const expectedResponse = { message: 'success' };
      processesServiceMock.delete.mockResolvedValue(expectedResponse);
      await expect(controller.delete(1)).resolves.toEqual(expectedResponse);
    });
    it('Deve rejeitar jogando o erro', async () => {
      const expectResponse = new Error('erro generico');
      processesServiceMock.delete.mockRejectedValue(expectResponse);
      await expect(controller.delete(1)).rejects.toEqual(expectResponse);
    });
  });
});
