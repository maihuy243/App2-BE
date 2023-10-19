import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('mart-product-import')
export class MartProductImportEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  productId: string;

  @Column()
  quantity: number;

  @Column({ default: new Date() })
  dateImport: Date;

  @Column()
  userId: number;
}
