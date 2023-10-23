import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { STATUS_COUPON, TYPE_COUPON } from 'src/enum/coupon.enum';

@Entity('mart-product-coupon')
export class MartProductCouponEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  couponName: string;

  @Column()
  couponCode: string;

  @Column({ default: TYPE_COUPON.PERCENT })
  type: string;

  @Column({ default: '0' })
  discount: string;

  @Column({ default: STATUS_COUPON.ACTIVE })
  status: number;

  @Column({ default: 0 })
  totalUsed: number;

  @Column({ default: 1 })
  limit: number;

  @Column()
  timeApplyFrom: string;

  @Column()
  timeApplyTo: string;
}
