/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { randomUUID } from 'crypto';
import { authServiceMock } from 'src/__mock__/services/auth.service';
import { LoginDto } from 'src/dtos/auth.dto';
import 'jest-extended';
import { AuthService } from 'src/services/auth/auth.service';
describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      await expect(controller.login(requestPayload)).resolves.toMatchObject(
        expectedPayload,
      );
    });
  });
});
