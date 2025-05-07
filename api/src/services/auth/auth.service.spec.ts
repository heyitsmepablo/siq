/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import 'jest-extended';
import { JwtModule } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { usersServiceMock } from '../../__mock__/services/users.service';
import { prismaMock } from 'src/__mock__/prisma-singleton';
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
      imports: [
        JwtModule.register({
          global: true,
          secret: 'test-secret',
          signOptions: { expiresIn: '1h' },
        }),
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it('Deve está definido', () => {
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it('Deve resolver com mesagem de sucesso', async () => {
      const payload = { username: 'teste', password: 'teste' };
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
      await expect(service.signUp(payload)).resolves.toEqual({
        message: 'success',
      });
    });
  });

  describe('signIn', () => {
    it('Deve resolver retornando payload com as informações do login', async () => {
      const requestBody = { username: 'pablo', password: 'pablo' };
      const expectedPayload = {
        token: expect.any(String),
        tokenType: expect.stringContaining('Bearer'),
        expireIn: expect.any(Number),
        expireAt: expect.any(Date),
        user: {
          id: expect.any(String),
          username: expect.any(String),
          lastLogin: expect.toBeOneOf([expect.any(Date), null]),
          createdAt: expect.toBeOneOf([
            expect.any(Date),
            expect.any(String),
            null,
          ]), // timestamp em ms
          updatedAt: expect.toBeOneOf([
            expect.any(Date),
            expect.any(String),
            null,
          ]),
        },
      };

      usersServiceMock.findOne.mockResolvedValue({
        id: randomUUID(),
        username: 'pablo',
        password: 'pablo',
        lastLogin: null,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: null,
      });

      usersServiceMock.updateOne.mockResolvedValue({ message: 'success' });

      await expect(service.signIn(requestBody)).resolves.toMatchObject(
        expectedPayload,
      );
    });
    it('Deve rejeitar ao não encontrar usuario e jogar mensagem de erro', async () => {
      const requestBody = { username: 'pablo', password: 'pablo' };

      usersServiceMock.findOne.mockResolvedValue(null);

      await expect(service.signIn(requestBody)).rejects.toThrow(
        new UnauthorizedException('Usuario ou senha incorreto'),
      );
    });
    it('Deve rejeitar caso a senha não corresponda e jogar mensagem de erro', async () => {
      const requestBody = { username: 'pablo', password: 'pablo' };

      usersServiceMock.findOne.mockResolvedValue({
        username: 'pablo',
        password: '1234',
      });

      await expect(service.signIn(requestBody)).rejects.toThrow(
        new UnauthorizedException('Usuario ou senha incorreto'),
      );
    });
  });
});
