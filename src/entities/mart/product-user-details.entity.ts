import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('mart-product-user-details')
export class MartProductUserDetailsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userId: number;

  @Column()
  point: number;

  @Column()
  rank: string;

  @Column({ default: 0 })
  prepaidWallet: number;
}
