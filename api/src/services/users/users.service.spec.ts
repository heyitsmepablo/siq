import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { prismaMock } from 'src/__mock__/prisma-singleton';
import { Prisma } from 'prisma/generated/client';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const prismaUsersPayload: Prisma.usersGetPayload<true> = {
    id: 'uuid',
    accessToken: null,
    lastLogin: null,
    username: 'username',
    password: 'password',
    tokenExpiration: null,
    createdAt: null,
    updatedAt: null,
  };
  describe('create', () => {
    it('Deve resolver com mensagem de sucesso', async () => {
      const requestPayload = prismaUsersPayload;
      const expectedResponse = { message: 'success' };
      prismaMock.users.create.mockResolvedValue(prismaUsersPayload);

      await expect(service.create(requestPayload)).resolves.toEqual(
        expectedResponse,
      );
    });
  });
  describe('findAll', () => {
    it('Deve resolver com o resultado no payload', async () => {
      const expectedResponse = [prismaUsersPayload];
      prismaMock.users.findMany.mockResolvedValue(expectedResponse);
      await expect(service.findAll()).resolves.toEqual(expectedResponse);
    });
    it('Deve rejeitar jogando o erro', async () => {
      const expectResponse = new Error('erro generico');
      prismaMock.users.findMany.mockRejectedValue(expectResponse);
      await expect(service.findAll()).rejects.toEqual(expectResponse);
    });
  });

  describe('findOne', () => {
    it('Deve resolver com payload no corpo', async () => {
      const requestPayload = prismaUsersPayload.id;
      const expectedResponse = prismaUsersPayload;
      prismaMock.users.findUnique.mockResolvedValue(prismaUsersPayload);
      await expect(service.findOne(requestPayload)).resolves.toEqual(
        expectedResponse,
      );
    });
    it('Deve rejeitar jogando o erro na resposta', async () => {
      const requestPayload = prismaUsersPayload.id;
      const expectedResponse = new Error('Erro generico');
      prismaMock.users.findUnique.mockRejectedValue(expectedResponse);
      await expect(service.findOne(requestPayload)).rejects.toEqual(
        expectedResponse,
      );
    });
  });

  describe('update', () => {
    it('Deve resolver com payload no corpo', async () => {
      const expectedResponse = { message: 'success' };
      const requestPayload = prismaUsersPayload;
      prismaMock.users.update.mockResolvedValue(prismaUsersPayload);
      await expect(
        service.updateOne(prismaUsersPayload.id, requestPayload),
      ).resolves.toEqual(expectedResponse);
    });
    it('Deve rejeitar jogando o erro na resposta', async () => {
      const expectedResponse = new Error('Erro generico');
      const requestPayload = prismaUsersPayload;
      prismaMock.users.update.mockRejectedValue(expectedResponse);
      await expect(
        service.updateOne(prismaUsersPayload.id, requestPayload),
      ).rejects.toEqual(expectedResponse);
    });
  });
  describe('delete', () => {
    it('Deve resolver com payload no corpo', async () => {
      const expectedResponse = { message: 'success' };
      const requestPayload = prismaUsersPayload.id;

      prismaMock.users.delete.mockResolvedValue(prismaUsersPayload);
      await expect(service.delete(requestPayload)).resolves.toEqual(
        expectedResponse,
      );
    });
    it('Deve rejeitar jogando o erro na resposta', async () => {
      const expectedResponse = new Error('Erro generico');
      const requestPayload = prismaUsersPayload.id;
      prismaMock.users.delete.mockRejectedValue(expectedResponse);
      await expect(service.delete(requestPayload)).rejects.toEqual(
        expectedResponse,
      );
    });
  });
});
