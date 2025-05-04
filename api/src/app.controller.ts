import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserCreateDto } from './dtos/users.dto';
import { AuthService } from './services/auth/auth.service';
import { LoginDto } from './dtos/auth.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  async signUp(@Body() data: UserCreateDto) {
    return await this.appService.newAccount(data);
  }
  @Post('/login')
  async login(@Body() data: LoginDto) {
    return await this.authService.signIn(data);
  }
}
