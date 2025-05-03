import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserCreateDto } from './dtos/users.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/signup')
  async signUp(@Body() data: UserCreateDto) {
    return await this.appService.newAccount(data);
  }
}
