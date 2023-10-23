import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CouponDto {
  @IsNotEmpty()
  couponName: string;

  @IsNotEmpty()
  couponCode: string;

  @IsNotEmpty()
  couponStatus: number;

  @IsNotEmpty()
  couponType: number;

  @IsNotEmpty()
  discount: string;

  @IsNotEmpty()
  timeApplyFrom: string;

  @IsNotEmpty()
  timeApplyTo: string;

  @Expose()
  totalUsed: number;

  @IsNotEmpty()
  limit: number;
}
