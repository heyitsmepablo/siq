import { Body, Controller, Get, Post } from '@nestjs/common';
import { InstituteCreateDto } from 'src/dtos/institutes.dto';
import { InstitutesService } from 'src/services/institutes/institutes.service';

@Controller('institute')
export class InstituteController {
  constructor(private readonly institutesService: InstitutesService) {}
  @Post()
  async create(@Body() data: InstituteCreateDto) {
    await this.institutesService.create(data);
    return { message: 'success' };
  }
  @Get()
  async findAll() {
    return await this.institutesService.findAll();
  }
}
