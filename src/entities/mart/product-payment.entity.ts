import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('mart-product-payment')
export class MartProductPaymentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  productId: string;

  @Column()
  quantity: number;

  @Column({ default: new Date() })
  date_payment: Date;

  @Column()
  userId: number;
}
