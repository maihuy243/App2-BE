import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('mart-product-inventory')
export class MartProductInventoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  productId: number;

  @Column({ default: 1 })
  stockOut: number;
}
