import { IsOptional, IsString } from 'class-validator';
import { Prisma } from 'prisma/generated/client';

export class InstituteCreateDto {
  @IsString()
  name: string;
}

export class InstituteUpdateDto implements Prisma.institutesUpdateInput {
  @IsOptional()
  name?: string;
}
