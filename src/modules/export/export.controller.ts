import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { ExportService } from './export.service';

@Controller('export')
@UseGuards(AuthGuard)
export class ExportController {
  constructor(private exportService: ExportService) {}

  @Get('products')
  exportProduct() {
    return this.exportService.exportProduct();
  }
}
