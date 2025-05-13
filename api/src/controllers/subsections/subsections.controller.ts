import { Controller, Get } from '@nestjs/common';
import { SubsectionsService } from 'src/services/subsections/subsections.service';

@Controller('subsections')
export class SubsectionsController {
  constructor(private readonly subsectionService: SubsectionsService) {}
  @Get()
  async findAll() {
    return await this.subsectionService.findAll();
  }
}
