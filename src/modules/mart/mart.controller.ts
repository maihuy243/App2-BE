import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { MartService } from './mart.service';
import { MartProductDto } from 'src/dto/mart/mart-product.dto';
import { MartCardDto } from 'src/dto/mart/mart-product-cart.dto';
import { ValidateStockOutDto } from 'src/dto/mart/validate-stockout.dto';
import { CouponDto } from 'src/dto/mart/coupon.dto';
import { UpdateCouponDto } from 'src/dto/mart/update-coupon.dto';

@Controller('mart')
@UseGuards(AuthGuard)
export class MartController {
  constructor(private martService: MartService) {}

  @Post('create-product')
  createProduct(@Body() body: MartProductDto) {
    return this.martService.createProduct(body);
  }

  @Post('update-product')
  updateProduct(@Body() body: MartProductDto) {
    return this.martService.updateProduct(body);
  }

  @Get('list-product')
  getListProduct(@Query() query: string) {
    return this.martService.getListProduct(query);
  }

  @Get('stockout')
  getListStockOut() {
    return this.martService.getListStockOut();
  }

  @Delete('delete-product/:id')
  deleteProduct(@Param() param) {
    return this.martService.deleteProduct(param);
  }

  @Post('cart')
  createCart(@Body() body: MartCardDto) {
    return this.martService.createCart(body);
  }

  @Get('cart')
  getCard(@Query() query) {
    return this.martService.getCard(query);
  }

  @Post('payment')
  payment(@Body() body: MartCardDto) {
    return this.martService.payment(body);
  }

  @Get('payment')
  getListPayment() {
    return this.martService.getListPayment();
  }

  @Get('sale')
  getDataSale() {
    return this.martService.getDataSale();
  }

  @Post('wallet')
  addWallet(@Body() body) {
    return this.martService.addWallet(body);
  }

  @Get('truncate-all')
  truncateData() {
    return this.martService.truncateData();
  }

  @Post('validate-stockout')
  validateStockout(@Body() body: ValidateStockOutDto[]) {
    return this.martService.validateStockout(body);
  }

  @Post('coupon')
  createCoupon(@Body() body: CouponDto) {
    return this.martService.createCoupon(body);
  }

  @Post('update-coupon')
  updateCoupon(@Body() body: UpdateCouponDto) {
    return this.martService.updateCoupon(body);
  }

  @Get('coupon')
  getCoupon(@Query() query: any) {
    return this.martService.getCoupon(query);
  }

  @Get('history-import-stockout')
  getHistoryImportStockOut() {
    return this.martService.getHistoryImportStockOut();
  }
}
