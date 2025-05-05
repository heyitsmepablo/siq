import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './services/auth/auth.service';
import { UsersService } from './services/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { InstitutesService } from './services/institutes/institutes.service';
import { InstituteController } from './controllers/institute/institute.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AppController, InstituteController],
  providers: [AppService, AuthService, UsersService, InstitutesService],
})
export class AppModule {}
