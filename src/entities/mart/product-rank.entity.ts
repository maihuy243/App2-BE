import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { RankEnum } from 'src/enum/discount-by-rank.enum';

@Entity('mart-product-rank')
export class MartProductRankEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  rank: RankEnum;

  @Column()
  pointRequired: number;
}
