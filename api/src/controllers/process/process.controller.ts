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
import { ProcessCreateDto, ProcessUpdateDto } from 'src/dtos/processes.dto';
import { ProcessesService } from 'src/services/processes/processes.service';
import { SectionsService } from 'src/services/sections/sections.service';
import { SubsectionsService } from 'src/services/subsections/subsections.service';

@Controller('process')
export class ProcessController {
  constructor(
    private readonly processesService: ProcessesService,
    private readonly sectionsService: SectionsService,
    private readonly subsectionsService: SubsectionsService,
  ) {}
  @Post()
  async create(@Body() payload: ProcessCreateDto) {
    return await this.processesService.create(payload);
  }
  @Get()
  async findAll() {
    return await this.processesService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return await this.processesService.findOne(id);
  }
  @Patch(':id')
  async updateOne(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() payload: ProcessUpdateDto,
  ) {
    return await this.processesService.updateOne(id, payload);
  }
  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return await this.processesService.delete(id);
  }
  @Get(':id/section/:idSection/subsection')
  async findSubsections(
    @Param('id', new ParseIntPipe()) id: number,
    @Param('idSection', new ParseIntPipe()) section_id: number,
  ) {
    return await this.subsectionsService.findAll({ section_id: section_id });
  }
}
