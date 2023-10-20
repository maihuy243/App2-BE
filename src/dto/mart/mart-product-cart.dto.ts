import { IsNotEmpty, IsOptional } from 'class-validator';
import { TypePaymentEnum } from 'src/enum/payment.enum';

export class MartCardDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  products: ProductCardDto[];

  @IsNotEmpty()
  useCoupon: boolean;

  @IsOptional()
  coupon: string | null;

  @IsNotEmpty()
  point: number;

  @IsNotEmpty()
  totalPrice: number;

  @IsOptional()
  paymentType: TypePaymentEnum;
}

export class ProductCardDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  discount: number;

  @IsNotEmpty()
  priceDiscount: number;
}
