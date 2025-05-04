/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserCreateDto } from './dtos/users.dto';
import { prismaMock } from './__mock__/prisma-singleton';
import { randomUUID } from 'crypto';
import { LoginDto } from './dtos/auth.dto';
import { AuthService } from './services/auth/auth.service';
import { authServiceMock } from './__mock__/services/auth.service';
import { UsersService } from './services/users/users.service';
import { usersServiceMock } from './__mock__/services/users.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();
    appController = app.get<AppController>(AppController);
  });

  describe('register', () => {
    it('Deve resolver com mesagem de sucesso', async () => {
      const payload: UserCreateDto = { username: 'teste', password: 'teste' };
      prismaMock.users.create.mockResolvedValue({
        id: randomUUID(),
        accessToken: null,
        lastLogin: null,
        tokenExpiration: null,
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

  describe('login', () => {
    it('Deve resolver retornando payload de autenticado', async () => {
      const requestPayload: LoginDto = { username: 'teste', password: 'teste' };
      const expectedPayload = {
        token: expect.any(String),
        tokenType: expect.stringContaining('Bearer'),
        expireIn: expect.any(Number),
        expireAt: expect.any(Date), // é um Date (não string)
        user: {
          id: expect.any(String),
          username: expect.any(String),
          lastLogin: expect.toBeOneOf([expect.any(Date), null]),
          createdAt: expect.any(Date), // timestamp em ms
          updatedAt: expect.toBeOneOf([expect.any(Date), null]),
        },
      };
      authServiceMock.signIn.mockResolvedValue({
        token: 'string',
        tokenType: 'Bearer',
        expireIn: Math.floor(new Date(Date.now()).getTime() / 1000),
        expireAt: new Date(Date.now()),
        user: {
          id: randomUUID(),
          username: 'teste',
          password: 'teste',
          lastLogin: null,
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
      });

      await expect(appController.login(requestPayload)).resolves.toMatchObject(
        expectedPayload,
      );
    });
  });
});
