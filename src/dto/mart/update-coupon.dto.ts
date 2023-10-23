import { IsNotEmpty, IsOptional } from 'class-validator';
import { STATUS_COUPON, TYPE_API_UPDATE } from 'src/enum/coupon.enum';

export class UpdateCouponDto {
  @IsOptional()
  id: number;

  @IsOptional()
  status: STATUS_COUPON;

  @IsOptional()
  couponCode: string;

  @IsNotEmpty()
  type: TYPE_API_UPDATE;

  @IsOptional()
  userId: number;
}
