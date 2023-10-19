import { MartProductRepo } from 'src/repositories/mart/product.repository';
import { MartController } from './mart.controller';
import { MartService } from './mart.service';
import { Module } from '@nestjs/common';
import { MartProductImportRepo } from 'src/repositories/mart/product-import.repository';
import { MartProductInventoryRepo } from 'src/repositories/mart/product-inventory.repository';
import { MartProductPaymentRepo } from 'src/repositories/mart/product-payment.repository';

@Module({
  imports: [],
  controllers: [MartController],
  providers: [
    MartService,
    MartProductRepo,
    MartProductImportRepo,
    MartProductInventoryRepo,
    MartProductPaymentRepo,
  ],
})
export class MartModule {}
