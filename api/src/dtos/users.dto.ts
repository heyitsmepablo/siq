import { IsString, Length } from 'class-validator';

export class UserCreateDto {
  @IsString()
  username: string;
  @IsString()
  @Length(6)
  password: string;
}
