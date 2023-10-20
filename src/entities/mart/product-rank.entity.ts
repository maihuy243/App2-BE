import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { DiscountByRankEnum } from 'src/enum/discount-by-rank.enum';

@Entity('mart-product-rank')
export class MartProductRankEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  rank: DiscountByRankEnum;

  @Column()
  pointRequired: number;
}
