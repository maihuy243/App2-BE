import { MartProductCouponUsedEntity } from 'src/entities';
import { DataSource, EntityRepository, Repository } from 'typeorm';

@EntityRepository(MartProductCouponUsedEntity)
export class MartProductCouponUsedRepo extends Repository<MartProductCouponUsedEntity> {
  constructor(private dataSource: DataSource) {
    super(MartProductCouponUsedEntity, dataSource.createEntityManager());
  }
}
