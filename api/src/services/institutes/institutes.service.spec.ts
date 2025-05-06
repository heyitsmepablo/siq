import { Test, TestingModule } from '@nestjs/testing';
import { InstitutesService } from './institutes.service';
import 'jest-extended';
import { prismaMock } from 'src/__mock__/prisma-singleton';
import { InstituteCreateDto } from 'src/dtos/institutes.dto';
import { Prisma } from 'prisma/generated/client';

describe('InstitutesService', () => {
  let service: InstitutesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstitutesService],
    }).compile();

    service = module.get<InstitutesService>(InstitutesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it('Deve resolver com mensagem de sucesso', async () => {
      const requestPayload: InstituteCreateDto = { name: 'teste' };
      const expectResponse = { message: 'success' };

      prismaMock.institutes.create.mockResolvedValue({
        id: 1,
        name: 'teste',
        createdAt: null,
        updatedAt: null,
      });

      await expect(service.create(requestPayload)).resolves.toEqual(
        expectResponse,
      );
    });
  });
  describe('findAll', () => {
    it('Deve resolver com o resultado no payload', async () => {
      const expectedResponse = [
        {
          id: 1,
          name: 'teste',
          createdAt: null,
          updatedAt: null,
        },
      ];
      prismaMock.institutes.findMany.mockResolvedValue(expectedResponse);
      await expect(service.findAll()).resolves.toEqual(expectedResponse);
    });
    it('Deve rejeitar jogando o erro', async () => {
      const expectResponse = new Error('erro generico');
      prismaMock.institutes.findMany.mockRejectedValue(expectResponse);
      await expect(service.findAll()).rejects.toEqual(expectResponse);
    });
  });

  describe('findOne', () => {
    it('Deve resolver com payload no corpo', async () => {
      const expectedResponse = {
        id: 1,
        name: 'teste',
        createdAt: null,
        updatedAt: null,
      };
      prismaMock.institutes.findUnique.mockResolvedValue(expectedResponse);
      await expect(service.findOne(1)).resolves.toEqual(expectedResponse);
    });
    it('Deve rejeitar jogando o erro na resposta', async () => {
      const expectedResponse = new Error('Erro generico');
      prismaMock.institutes.findUnique.mockRejectedValue(expectedResponse);
      await expect(service.findOne(1)).rejects.toEqual(expectedResponse);
    });
  });

  describe('update', () => {
    it('Deve resolver com payload no corpo', async () => {
      const expectedResponse = { message: 'success' };
      const payloadRequest = {
        id: 1,
        name: 'teste',
        createdAt: null,
        updatedAt: null,
      };
      prismaMock.institutes.update.mockResolvedValue(payloadRequest);
      await expect(service.update(1, payloadRequest)).resolves.toEqual(
        expectedResponse,
      );
    });
    it('Deve rejeitar jogando o erro na resposta', async () => {
      const expectedResponse = new Error('Erro generico');
      prismaMock.institutes.update.mockRejectedValue(expectedResponse);
      await expect(service.update(1, {})).rejects.toEqual(expectedResponse);
    });
  });
  describe('delete', () => {
    it('Deve resolver com payload no corpo', async () => {
      const expectedResponse = { message: 'success' };
      const payloadRequest = 1;
      const payloadPrismaResponse = {
        id: 1,
        name: 'teste',
        createdAt: null,
        updatedAt: null,
      };
      prismaMock.institutes.update.mockResolvedValue(payloadPrismaResponse);
      await expect(service.delete(payloadRequest)).resolves.toEqual(
        expectedResponse,
      );
    });
    it('Deve rejeitar jogando o erro na resposta', async () => {
      const expectedResponse = new Error('Erro generico');
      prismaMock.institutes.update.mockRejectedValue(expectedResponse);
      await expect(service.update(1, {})).rejects.toEqual(expectedResponse);
    });
  });
});
