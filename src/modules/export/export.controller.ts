import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { ExportService } from './export.service';
import { ExportEnum } from 'src/enum/typeExport.enum';

@Controller('export')
@UseGuards(AuthGuard)
export class ExportController {
  constructor(private exportService: ExportService) {}

  @Get(ExportEnum.PRODUCTS.toString())
  exportProduct() {
    return this.exportService.exportProduct();
  }
}
