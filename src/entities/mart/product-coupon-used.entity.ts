import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('mart-product-coupon-used')
export class MartProductCouponUsedEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  couponId: number;

  @Column()
  userId: number;
}
