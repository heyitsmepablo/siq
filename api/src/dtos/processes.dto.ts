import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

export class ProcesseCreateDto {
  @IsString()
  name: string;
  @IsString()
  type: string;
}

export class ProcesseUpdateDto extends PartialType(ProcesseCreateDto) {
  @IsOptional()
  name?: string;
  @IsOptional()
  type?: string;
}
