import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

export class ProcessCreateDto {
  @IsString()
  name: string;
  @IsString()
  type: string;
}

export class ProcessUpdateDto extends PartialType(ProcessCreateDto) {
  @IsOptional()
  name?: string;
  @IsOptional()
  type?: string;
}
