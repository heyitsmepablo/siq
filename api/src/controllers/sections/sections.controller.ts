import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SectionCreateDto, SectionUpdateDto } from 'src/dtos/sections.dto';
import { SectionsService } from 'src/services/sections/sections.service';

@Controller('process/:process_id/section')
export class SectionsController {
  constructor(private readonly sectionService: SectionsService) {}
  @Post()
  async create(data: SectionCreateDto) {
    return await this.sectionService.create(data);
  }
  @Get()
  async findAll(@Param('process_id', new ParseIntPipe()) process_id: number) {
    return await this.sectionService.findAll({ process_id });
  }
  @Get(':id')
  async findOne(
    @Param('process_id', new ParseIntPipe()) process_id: number,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return await this.sectionService.findOne({ id, process_id });
  }
  @Patch(':id')
  async updateOne(
    @Param('id', new ParseIntPipe()) section_id: number,
    @Body() data: SectionUpdateDto,
  ) {
    return await this.sectionService.updateOne(section_id, data);
  }
  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) section_id: number) {
    return await this.sectionService.delete(section_id);
  }
}
