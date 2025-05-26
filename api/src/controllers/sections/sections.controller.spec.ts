import { Test, TestingModule } from '@nestjs/testing';
import { SectionsController } from './sections.controller';
import { Prisma } from 'prisma/generated/client';
import { sectionsServiceMock } from 'src/__mock__/services/sections.service';
import { SectionsService } from 'src/services/sections/sections.service';
import { SectionUpdateDto } from 'src/dtos/sections.dto';

describe('SectionsController', () => {
  let controller: SectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionsController],
      providers: [{ provide: SectionsService, useValue: sectionsServiceMock }],
    }).compile();

    controller = module.get<SectionsController>(SectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  const prismaPayload: Prisma.sectionsGetPayload<true> = {
    code: 'teste',
    id: 1,
    createdAt: null,
    updatedAt: null,
    process_id: 1,
  };
  describe('create', () => {
    it('Deve resolver com o resultado no payload', async () => {
      const requestPayload = {
        id: 1,
        code: 'teste',
        createdAt: null,
        process_id: 1,
        updatedAt: null,
      };
      const expectedResponse = { message: 'success' };
      sectionsServiceMock.create.mockResolvedValue(expectedResponse);
      await expect(controller.create(requestPayload)).resolves.toEqual(
        expectedResponse,
      );
    });
    it('Deve rejeitar jogando o erro', async () => {
      const requestPayload = {
        id: 1,
        code: 'teste',
        createdAt: null,
        process_id: 1,
        updatedAt: null,
      };
      const expectResponse = new Error('erro generico');
      sectionsServiceMock.create.mockRejectedValue(expectResponse);
      await expect(controller.create(requestPayload)).rejects.toEqual(
        expectResponse,
      );
    });
  });
  describe('findAll', () => {
    const process_id: number = 1;
    it('Deve resolver com o resultado no payload', async () => {
      const expectedResponse = [prismaPayload];
      sectionsServiceMock.findAll.mockResolvedValue(expectedResponse);
      await expect(controller.findAll(process_id)).resolves.toEqual(
        expectedResponse,
      );
    });
    it('Deve rejeitar jogando o erro', async () => {
      const expectResponse = new Error('erro generico');
      sectionsServiceMock.findAll.mockRejectedValue(expectResponse);
      await expect(controller.findAll(process_id)).rejects.toEqual(
        expectResponse,
      );
    });
  });
  describe('findOne', () => {
    const section_id: number = 1;
    const process_id: number = 1;
    it('Deve resolver com o resultado no payload', async () => {
      const expectedResponse = prismaPayload;
      sectionsServiceMock.findOne.mockResolvedValue(prismaPayload);
      await expect(controller.findOne(section_id, process_id)).resolves.toEqual(
        expectedResponse,
      );
    });
    it('Deve rejeitar jogando o erro', async () => {
      const expectResponse = new Error('erro generico');
      sectionsServiceMock.findOne.mockRejectedValue(expectResponse);
      await expect(controller.findOne(section_id, process_id)).rejects.toEqual(
        expectResponse,
      );
    });
  });
  describe('updateOne', () => {
    it('Deve resolver com o resultado no payload', async () => {
      const expectedResponse = { message: 'success' };
      const requestPayload: SectionUpdateDto = { code: 'teste', process_id: 1 };
      sectionsServiceMock.updateOne.mockResolvedValue(expectedResponse);
      await expect(controller.updateOne(1, requestPayload)).resolves.toEqual(
        expectedResponse,
      );
    });
    it('Deve rejeitar jogando o erro', async () => {
      const expectResponse = new Error('erro generico');
      sectionsServiceMock.updateOne.mockRejectedValue(expectResponse);
      await expect(controller.updateOne(1, {})).rejects.toEqual(expectResponse);
    });
  });
  describe('delete', () => {
    it('Deve resolver com o resultado no payload', async () => {
      const expectedResponse = { message: 'success' };
      sectionsServiceMock.delete.mockResolvedValue(expectedResponse);
      await expect(controller.delete(1)).resolves.toEqual(expectedResponse);
    });
    it('Deve rejeitar jogando o erro', async () => {
      const expectResponse = new Error('erro generico');
      sectionsServiceMock.delete.mockRejectedValue(expectResponse);
      await expect(controller.delete(1)).rejects.toEqual(expectResponse);
    });
  });
});
