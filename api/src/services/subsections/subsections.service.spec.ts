import { Test, TestingModule } from '@nestjs/testing';
import { SubsectionsService } from './subsections.service';
import { prismaMock } from 'src/__mock__/prisma-singleton';
import { SubsectionCreateDto } from 'src/dtos/subsections.dto';
import { Prisma } from 'prisma/generated/client';

describe('SubsectionsService', () => {
  let service: SubsectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubsectionsService],
    }).compile();

    service = module.get<SubsectionsService>(SubsectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const prismaPayload: Prisma.subsectionsGetPayload<true> = {
    id: 1,
    code: 'x',
    name: 'test',
    description: 'test',
    section_id: 1,
    createdAt: null,
    updatedAt: null,
  };

  describe('create', () => {
    it('Deve resolver com mensagem de sucesso', async () => {
      const requestPayload: SubsectionCreateDto = {
        code: 'x',
        name: 'test',
        description: 'test',
        section_id: 1,
      };
      const expectResponse = { message: 'success' };

      prismaMock.subsections.create.mockResolvedValue(prismaPayload);

      await expect(service.create(requestPayload)).resolves.toEqual(
        expectResponse,
      );
    });
  });
  describe('findAll', () => {
    it('Deve resolver com o resultado no payload', async () => {
      const expectedResponse = [prismaPayload];
      prismaMock.subsections.findMany.mockResolvedValue([prismaPayload]);
      await expect(service.findAll()).resolves.toEqual(expectedResponse);
    });
    it('Deve rejeitar jogando o erro', async () => {
      const expectResponse = new Error('erro generico');
      prismaMock.subsections.findMany.mockRejectedValue(expectResponse);
      await expect(service.findAll()).rejects.toEqual(expectResponse);
    });
  });

  describe('findOne', () => {
    it('Deve resolver com payload no corpo', async () => {
      const expectedResponse = prismaPayload;
      prismaMock.subsections.findUnique.mockResolvedValue(prismaPayload);
      await expect(service.findOne(1)).resolves.toEqual(expectedResponse);
    });
    it('Deve rejeitar jogando o erro na resposta', async () => {
      const expectedResponse = new Error('Erro generico');
      prismaMock.subsections.findUnique.mockRejectedValue(expectedResponse);
      await expect(service.findOne(1)).rejects.toEqual(expectedResponse);
    });
  });

  describe('update', () => {
    it('Deve resolver com payload no corpo', async () => {
      const expectedResponse = { message: 'success' };
      const payloadRequest = {};
      prismaMock.subsections.update.mockResolvedValue(prismaPayload);
      await expect(service.updateOne(1, payloadRequest)).resolves.toEqual(
        expectedResponse,
      );
    });
    it('Deve rejeitar jogando o erro na resposta', async () => {
      const expectedResponse = new Error('Erro generico');
      prismaMock.subsections.update.mockRejectedValue(expectedResponse);
      await expect(service.updateOne(1, {})).rejects.toEqual(expectedResponse);
    });
  });
  describe('delete', () => {
    it('Deve resolver com payload no corpo', async () => {
      const expectedResponse = { message: 'success' };
      const payloadRequest = 1;
      prismaMock.subsections.update.mockResolvedValue(prismaPayload);
      await expect(service.delete(payloadRequest)).resolves.toEqual(
        expectedResponse,
      );
    });
    it('Deve rejeitar jogando o erro na resposta', async () => {
      const expectedResponse = new Error('Erro generico');
      const payloadRequest = 1;
      prismaMock.subsections.delete.mockRejectedValue(expectedResponse);
      await expect(service.delete(payloadRequest)).rejects.toEqual(
        expectedResponse,
      );
    });
  });
});
