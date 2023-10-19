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

  @Get('list-product')
  getListProduct(@Query() query: string) {
    return this.martService.getListProduct(query);
  }

  @Delete('delete-product/:id')
  deleteProduct(@Param() param) {
    return this.martService.deleteProduct(param);
  }
}
