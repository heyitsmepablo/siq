import { Test, TestingModule } from '@nestjs/testing';
import { ProcessesService } from './processes.service';
import { prismaMock } from 'src/__mock__/prisma-singleton';
import { Prisma } from 'prisma/generated/client';
import { ProcesseCreateDto } from 'src/dtos/processes.dto';

describe('ProcessesService', () => {
  let service: ProcessesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessesService],
    }).compile();

    service = module.get<ProcessesService>(ProcessesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  const prismaPayload: Prisma.processesGetPayload<true> = {
    id: 1,
    name: 'teste',
    type: 'teste',
    createdAt: null,
    updatedAt: null,
  };
  describe('create', () => {
    it('Deve resolver com mensagem de sucesso', async () => {
      const requestPayload: ProcesseCreateDto = {
        name: 'teste',
        type: 'testes',
      };
      const expectResponse = { message: 'success' };

      prismaMock.processes.create.mockResolvedValue(prismaPayload);

      await expect(service.create(requestPayload)).resolves.toEqual(
        expectResponse,
      );
    });
  });
  describe('findAll', () => {
    it('Deve resolver com o resultado no payload', async () => {
      const expectedResponse = [prismaPayload];
      prismaMock.processes.findMany.mockResolvedValue([prismaPayload]);
      await expect(service.findAll()).resolves.toEqual(expectedResponse);
    });
    it('Deve rejeitar jogando o erro', async () => {
      const expectResponse = new Error('erro generico');
      prismaMock.processes.findMany.mockRejectedValue(expectResponse);
      await expect(service.findAll()).rejects.toEqual(expectResponse);
    });
  });

  describe('findOne', () => {
    it('Deve resolver com payload no corpo', async () => {
      const expectedResponse = prismaPayload;
      prismaMock.processes.findUnique.mockResolvedValue(prismaPayload);
      await expect(service.findOne(1)).resolves.toEqual(expectedResponse);
    });
    it('Deve rejeitar jogando o erro na resposta', async () => {
      const expectedResponse = new Error('Erro generico');
      prismaMock.processes.findUnique.mockRejectedValue(expectedResponse);
      await expect(service.findOne(1)).rejects.toEqual(expectedResponse);
    });
  });

  describe('update', () => {
    it('Deve resolver com payload no corpo', async () => {
      const expectedResponse = { message: 'success' };
      const payloadRequest = prismaPayload;
      prismaMock.processes.update.mockResolvedValue(payloadRequest);
      await expect(service.updateOne(1, payloadRequest)).resolves.toEqual(
        expectedResponse,
      );
    });
    it('Deve rejeitar jogando o erro na resposta', async () => {
      const expectedResponse = new Error('Erro generico');
      prismaMock.processes.update.mockRejectedValue(expectedResponse);
      await expect(service.updateOne(1, {})).rejects.toEqual(expectedResponse);
    });
  });
  describe('delete', () => {
    it('Deve resolver com payload no corpo', async () => {
      const expectedResponse = { message: 'success' };
      const payloadRequest = 1;
      prismaMock.processes.update.mockResolvedValue(prismaPayload);
      await expect(service.delete(payloadRequest)).resolves.toEqual(
        expectedResponse,
      );
    });
    it('Deve rejeitar jogando o erro na resposta', async () => {
      const expectedResponse = new Error('Erro generico');
      const payloadRequest = 1;
      prismaMock.processes.delete.mockRejectedValue(expectedResponse);
      await expect(service.delete(payloadRequest)).rejects.toEqual(
        expectedResponse,
      );
    });
  });
});
