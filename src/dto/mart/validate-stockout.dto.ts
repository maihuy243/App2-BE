import { IsNotEmpty } from 'class-validator';

export class ValidateStockOutDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  productName: string;
}
