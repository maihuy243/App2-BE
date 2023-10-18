import { RoleEnum } from 'src/enum/role.enum';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  hashPass: string;

  @Column({ default: RoleEnum.ADMIN })
  role: RoleEnum;
}
