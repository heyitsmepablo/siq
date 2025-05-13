import { PartialType } from '@nestjs/mapped-types';

export class SubsectionCreateDto {
  code?: string | null | undefined;
  name: string;
  description: string;
  section_id: number;
}

export class SubsectionUpdateDto extends PartialType(SubsectionCreateDto) {
  code?: string | null | undefined;
  description?: string | undefined;
  name?: string | undefined;
  section_id?: number | undefined;
}
