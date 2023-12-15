import { Module } from '@nestjs/common';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';
import { MartProductRepo } from 'src/repositories/mart/product.repository';

@Module({
  imports: [],
  controllers: [ExportController],
  providers: [ExportService, MartProductRepo],
})
export class ExportModule {}
