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
        message: 'success',
      };
      prismaMock.institutes.update.mockResolvedValue({
        id: 1,
        name: 'teste',
        createdAt: null,
        updatedAt: null,
      });
      await expect(service.findOne(1)).resolves.toEqual(expectedResponse);
    });
  });
  it('Deve rejeitar jogando o erro na resposta', async () => {
    const expectedResponse = new Error('Erro generico');
    prismaMock.institutes.update.mockRejectedValue(expectedResponse);
    await expect(service.findOne(1)).rejects.toEqual(expectedResponse);
  });
});
