import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from 'src/dtos/auth.dto';
import { UserCreateDto } from 'src/dtos/users.dto';
import { AuthService } from 'src/services/auth/auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  async signUp(@Body() data: UserCreateDto) {
    return await this.authService.signUp(data);
  }
  @Post('/login')
  async login(@Body() data: LoginDto) {
    return await this.authService.signIn(data);
  }
}
