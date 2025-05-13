import { Test, TestingModule } from '@nestjs/testing';
import { SectionsService } from './sections.service';
import { prismaMock } from 'src/__mock__/prisma-singleton';
import { SectionCreateDto, SectionUpdateDto } from 'src/dtos/sections.dto';
import { Prisma } from 'prisma/generated/client';

describe('SectionsService', () => {
  let service: SectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SectionsService],
    }).compile();

    service = module.get<SectionsService>(SectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  const prismaPayload: Prisma.sectionsGetPayload<true> = {
    id: 1,
    code: 'x',
    process_id: 1,
    createdAt: null,
    updatedAt: null,
  };
  describe('create', () => {
    it('Deve resolver com mensagem de sucesso', async () => {
      const requestPayload: SectionCreateDto = {
        code: 'x',
        process_id: 1,
      };
      const expectResponse = { message: 'success' };

      prismaMock.sections.create.mockResolvedValue(prismaPayload);

      await expect(service.create(requestPayload)).resolves.toEqual(
        expectResponse,
      );
    });
  });
  describe('findAll', () => {
    it('Deve resolver com o resultado no payload', async () => {
      const expectedResponse = [prismaPayload];
      prismaMock.sections.findMany.mockResolvedValue([prismaPayload]);
      await expect(service.findAll()).resolves.toEqual(expectedResponse);
    });
    it('Deve rejeitar jogando o erro', async () => {
      const expectResponse = new Error('erro generico');
      prismaMock.sections.findMany.mockRejectedValue(expectResponse);
      await expect(service.findAll()).rejects.toEqual(expectResponse);
    });
  });

  describe('findOne', () => {
    it('Deve resolver com payload no corpo', async () => {
      const expectedResponse = prismaPayload;
      prismaMock.sections.findUnique.mockResolvedValue(prismaPayload);
      await expect(service.findOne(1)).resolves.toEqual(expectedResponse);
    });
    it('Deve rejeitar jogando o erro na resposta', async () => {
      const expectedResponse = new Error('Erro generico');
      prismaMock.sections.findUnique.mockRejectedValue(expectedResponse);
      await expect(service.findOne(1)).rejects.toEqual(expectedResponse);
    });
  });

  describe('update', () => {
    it('Deve resolver com payload no corpo', async () => {
      const expectedResponse = { message: 'success' };
      const payloadRequest: SectionUpdateDto = { code: 'x', process_id: 1 };
      prismaMock.sections.update.mockResolvedValue(prismaPayload);
      await expect(service.updateOne(1, payloadRequest)).resolves.toEqual(
        expectedResponse,
      );
    });
    it('Deve rejeitar jogando o erro na resposta', async () => {
      const expectedResponse = new Error('Erro generico');
      prismaMock.sections.update.mockRejectedValue(expectedResponse);
      await expect(service.updateOne(1, {})).rejects.toEqual(expectedResponse);
    });
  });
  describe('delete', () => {
    it('Deve resolver com payload no corpo', async () => {
      const expectedResponse = { message: 'success' };
      const payloadRequest = 1;
      prismaMock.sections.update.mockResolvedValue(prismaPayload);
      await expect(service.delete(payloadRequest)).resolves.toEqual(
        expectedResponse,
      );
    });
    it('Deve rejeitar jogando o erro na resposta', async () => {
      const expectedResponse = new Error('Erro generico');
      const payloadRequest = 1;
      prismaMock.sections.delete.mockRejectedValue(expectedResponse);
      await expect(service.delete(payloadRequest)).rejects.toEqual(
        expectedResponse,
      );
    });
  });
});
