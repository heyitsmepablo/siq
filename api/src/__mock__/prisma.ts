import { PrismaClient } from 'generated/prisma';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

const prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();

const setupMock = () =>
  jest.mock('../database/prisma', () => ({
    __esModule: true,
    default: prismaMock,
  }));

export { setupMock, prismaMock };
