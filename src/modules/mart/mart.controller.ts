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
}
