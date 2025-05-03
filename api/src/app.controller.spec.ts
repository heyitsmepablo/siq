import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserCreateDto } from './dtos/users.dto';
import { prismaMock } from './__mock__/prisma-singleton';

describe('AppController', () => {
  let appController: AppController;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    appController = app.get<AppController>(AppController);
  });

  describe('register', () => {
    it('deve resolver com mesagem de sucesso', async () => {
      const payload: UserCreateDto = { username: 'teste', password: 'teste' };
      prismaMock.users.create.mockResolvedValue({
        id: 1,
        password: '',
        username: '',
        updatedAt: null,
        createdAt: null,
      });
      await expect(appController.signUp(payload)).resolves.toEqual({
        message: 'success',
      });
    });
  });
});
