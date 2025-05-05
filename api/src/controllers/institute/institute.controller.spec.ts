import { Test, TestingModule } from '@nestjs/testing';
import { InstituteController } from './institute.controller';
import { InstitutesService } from 'src/services/institutes/institutes.service';
import { instituteServiceMock } from 'src/__mock__/services/institute.service';
import { InstituteCreateDto } from 'src/dtos/institutes.dto';

describe('InstituteController', () => {
  let controller: InstituteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstituteController],
      providers: [
        { provide: InstitutesService, useValue: instituteServiceMock },
      ],
    }).compile();

    controller = module.get<InstituteController>(InstituteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('Deve resolver com mensagem de sucesso', async () => {
      const requestPayload: InstituteCreateDto = { name: 'Hospital A' };
      const expectedResponse = { message: 'success' };
      instituteServiceMock.create.mockResolvedValue(null);
      await expect(controller.create(requestPayload)).resolves.toEqual(
        expectedResponse,
      );
    });
    it('Deve rejeitar jogando o erro', async () => {
      const requestPayload: InstituteCreateDto = { name: 'Hospital A' };
      const expectedResponse = new Error('erro generico');
      instituteServiceMock.create.mockRejectedValue(expectedResponse);
      await expect(controller.create(requestPayload)).rejects.toEqual(
        expectedResponse,
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
      instituteServiceMock.findAll.mockResolvedValue(expectedResponse);
      await expect(controller.findAll()).resolves.toEqual(expectedResponse);
    });
    it('Deve rejeitar jogando o erro', async () => {
      const expectResponse = new Error('erro generico');
      instituteServiceMock.findAll.mockRejectedValue(expectResponse);
      await expect(controller.findAll()).rejects.toEqual(expectResponse);
    });
  });
});
