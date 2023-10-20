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
  data: string;

  @Column()
  totalPrice: number;

  @Column()
  point: number;
}
