import { Test, TestingModule } from '@nestjs/testing';
import { SubsectionsController } from './subsections.controller';
import { subsectionsServiceMock } from 'src/__mock__/services/subsections.service';
import { Prisma } from 'prisma/generated/client';
import { SubsectionsService } from 'src/services/subsections/subsections.service';

describe('SubsectionsController', () => {
  let controller: SubsectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubsectionsController],
      providers: [
        { provide: SubsectionsService, useValue: subsectionsServiceMock },
      ],
    }).compile();

    controller = module.get<SubsectionsController>(SubsectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const prismaPayload: Prisma.sectionsGetPayload<true> = {
    code: '',
    createdAt: null,
    id: 1,
    process_id: 1,
    updatedAt: null,
  };
  describe('findAll', () => {
    it('Deve resolver com o resultado no payload', async () => {
      const expectedResponse = [prismaPayload];
      subsectionsServiceMock.findAll.mockResolvedValue(expectedResponse);
      await expect(controller.findAll()).resolves.toEqual(expectedResponse);
    });
    it('Deve rejeitar jogando o erro', async () => {
      const expectResponse = new Error('erro generico');
      subsectionsServiceMock.findAll.mockRejectedValue(expectResponse);
      await expect(controller.findAll()).rejects.toEqual(expectResponse);
    });
  });
});
