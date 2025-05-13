import { PartialType } from '@nestjs/mapped-types';

export class SectionCreateDto {
  code?: string | null | undefined;
  process_id: number;
}

export class SectionUpdateDto extends PartialType(SectionCreateDto) {
  code?: string | null | undefined;
  process_id?: number | undefined;
}
