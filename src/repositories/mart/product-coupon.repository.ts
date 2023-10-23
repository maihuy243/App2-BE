import { MartProductCouponEntity } from 'src/entities';
import { DataSource, EntityRepository, Repository } from 'typeorm';

@EntityRepository(MartProductCouponEntity)
export class MartProductCouponRepo extends Repository<MartProductCouponEntity> {
  constructor(private dataSource: DataSource) {
    super(MartProductCouponEntity, dataSource.createEntityManager());
  }

  async findCoupon(query: any) {
    const queryBuild = this.createQueryBuilder('c');

    if (query.status) {
      queryBuild.andWhere('c.status = :status', {
        status: query.status,
      });
    }

    return await queryBuild.getMany();
  }
}
