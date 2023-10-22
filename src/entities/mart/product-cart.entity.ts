import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { TypePaymentEnum } from 'src/enum/payment.enum';

@Entity('mart-product-cart')
export class MartProductCartEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ default: '0' })
  totalPrice: string;

  @Column()
  userId: number;

  @Column()
  data: string;

  @Column({ nullable: true })
  point: string;

  @Column({ nullable: true })
  paymentType: TypePaymentEnum;

  @Column({ nullable: true })
  coupon: string;
}
