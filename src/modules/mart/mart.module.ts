import { MartProductRepo } from 'src/repositories/mart/product.repository';
import { MartController } from './mart.controller';
import { MartService } from './mart.service';
import { Module } from '@nestjs/common';
import { MartProductImportRepo } from 'src/repositories/mart/product-import.repository';
import { MartProductInventoryRepo } from 'src/repositories/mart/product-inventory.repository';
import { MartProductPaymentRepo } from 'src/repositories/mart/product-payment.repository';
import { MartProductCountRepo } from 'src/repositories/mart/product-count.repository';
import { Util } from 'src/util/util';
import { MartProductCardRepo } from 'src/repositories/mart/product-card.repository';
import { AuthRepo } from 'src/repositories/auth.repository';
import { MartProductRankRepo } from 'src/repositories/mart/product-rank.repository';
import { MartProductCouponRepo } from 'src/repositories/mart/product-coupon.repository';
import { MartProductCouponUsedRepo } from 'src/repositories/mart/product-coupon-used.repository';

@Module({
  imports: [],
  controllers: [MartController],
  providers: [
    MartService,
    MartProductRepo,
    MartProductImportRepo,
    MartProductInventoryRepo,
    MartProductPaymentRepo,
    MartProductCountRepo,
    MartProductCardRepo,
    MartProductRankRepo,
    MartProductCouponRepo,
    MartProductCouponUsedRepo,
    AuthRepo,
    Util,
  ],
})
export class MartModule {}
