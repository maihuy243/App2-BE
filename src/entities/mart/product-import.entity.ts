import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('mart-product-import')
export class MartProductImportEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @Column()
  userId: number;
}
