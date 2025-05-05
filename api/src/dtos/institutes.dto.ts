import { IsString } from 'class-validator';

export class InstituteCreateDto {
  @IsString()
  name: string;
}
