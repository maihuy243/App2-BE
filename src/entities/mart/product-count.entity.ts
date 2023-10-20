import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product-count')
export class MartProductCountEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ default: 1 })
  count: number;
}
