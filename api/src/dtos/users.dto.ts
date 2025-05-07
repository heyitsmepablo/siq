import { PartialType } from '@nestjs/mapped-types';
import { IsString, Length } from 'class-validator';

export class UserCreateDto {
  @IsString()
  username: string;
  @IsString()
  @Length(6)
  password: string;
}

export class UserUpdateDto extends PartialType(UserCreateDto) {
  username?: string | undefined;
  password?: string | undefined;
}
