import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('mart-product')
export class MartProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  productName: string;

  @Column()
  price: number;

  @Column()
  type: string;

  @Column()
  standar: string;

  @Column()
  productCode: string;

  @Column({ default: 0 })
  sale: number;

  @Column({ nullable: true })
  discount: string;

  @Column({ nullable: true })
  priceDiscount: string;

  @Column()
  userId: number;

  @Column({ default: false })
  isDelete: boolean;
}
