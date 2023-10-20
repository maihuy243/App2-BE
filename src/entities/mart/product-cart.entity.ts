import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('mart-product-cart')
export class MartProductCartEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  totalPrice: number;

  @Column()
  userId: number;

  @Column()
  data: string;

  @Column({ nullable: true })
  coupon: string;
}
