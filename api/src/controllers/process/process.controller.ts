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

@Controller('process')
export class ProcessController {
  constructor(private readonly processesService: ProcessesService) {}
  @Post()
  async create(@Body() payload: ProcessCreateDto) {
    return await this.processesService.create(payload);
  }
  @Get()
  async findAll() {
    return await this.processesService.findAll();
  }
  @Get(':id')
  async findOne(@Param(':id', new ParseIntPipe()) id: number) {
    return await this.processesService.findOne(id);
  }
  @Patch(':id')
  async updateOne(
    @Param(':id', new ParseIntPipe()) id: number,
    @Body() payload: ProcessUpdateDto,
  ) {
    return await this.processesService.updateOne(id, payload);
  }
  @Delete(':id')
  async delete(@Param(':id', new ParseIntPipe()) id: number) {
    return await this.processesService.delete(id);
  }
}
