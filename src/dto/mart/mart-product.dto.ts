import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/entities/base.entity';

export class MartProductDto extends BaseEntity {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  standar: string;

  @IsOptional()
  discount;

  @IsOptional()
  priceDiscount;

  @IsNotEmpty()
  userId: number;
}
