import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  const mockJwtService = {
    verifyAsync: jest.fn(),
  } as unknown as JwtService;
  it('should be defined', () => {
    expect(new AuthGuard(mockJwtService)).toBeDefined();
  });
});
