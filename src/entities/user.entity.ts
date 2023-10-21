import { RoleEnum } from 'src/enum/role.enum';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { RankEnum } from 'src/enum/discount-by-rank.enum';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  hashPass: string;

  @Column({ default: 0 })
  wallet: string;

  @Column({ default: RankEnum.BRONV })
  rank: number;

  @Column({ default: '0' })
  point: string;

  @Column({ default: RoleEnum.ADMIN })
  role: RoleEnum;
}
