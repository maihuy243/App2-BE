import {
  MartProductEntity,
  MartProductImportEntity,
  UserEntity,
} from 'src/entities';
import { DataSource, EntityRepository, Repository } from 'typeorm';

@EntityRepository(MartProductImportEntity)
export class MartProductImportRepo extends Repository<MartProductImportEntity> {
  constructor(private dataSource: DataSource) {
    super(MartProductImportEntity, dataSource.createEntityManager());
  }

  async getAllData() {
    return await this.createQueryBuilder('i')
      .leftJoin(MartProductEntity, 'p', 'i.productId = p.id')
      .leftJoin(UserEntity, 'u', 'i.userId = u.id')
      .select([
        'i.createdAt as "createdAt"',
        'p.productName as "productName"',
        'i.productId as "productId" ',
        'i.quantity ',
        'u.username ',
      ])
      .orderBy('i.productId', 'ASC')
      .getRawMany();
  }
}
