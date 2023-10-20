import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('mart-product-coupon')
export class MartProductCouponEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  coupon: string;

  @Column()
  type: string;

  @Column()
  discount: number;

  @Column({ default: 1 })
  slot: number;
}
