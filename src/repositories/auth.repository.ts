import { UserEntity } from 'src/entities';
import { DataSource, EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserEntity)
export class AuthRepo extends Repository<UserEntity> {
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async findAccount(key: string, value: any) {
    const query = this.createQueryBuilder('u');

    switch (key) {
      case 'username':
        query.where('u.username = :username', {
          username: value,
        });
        break;
      case 'id':
        query.where('u.id = :id', {
          id: value,
        });
        break;
      default:
        break;
    }
    return await query.getOne();
  }
}
