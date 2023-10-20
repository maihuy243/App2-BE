import { MartProductCountEntity } from 'src/entities';
import { DataSource, EntityRepository, Repository } from 'typeorm';

@EntityRepository(MartProductCountEntity)
export class MartProductCouponRepo extends Repository<MartProductCountEntity> {
  constructor(private dataSource: DataSource) {
    super(MartProductCountEntity, dataSource.createEntityManager());
  }
}
