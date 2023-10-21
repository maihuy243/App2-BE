import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { TypePaymentEnum } from 'src/enum/payment.enum';

@Entity('mart-product-payment')
export class MartProductPaymentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ default: new Date() })
  date_payment: Date;

  @Column()
  userId: number;

  @Column()
  paymentType: TypePaymentEnum;

  @Column()
  discountByCoupon: number;

  @Column({ default: 0 })
  shippingCharges: number;

  @Column()
  data: string;

  @Column({ default: '0' })
  totalPrice: string;

  @Column({ default: '0' })
  point: string;
}
