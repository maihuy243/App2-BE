import { UpdateCouponDto } from 'src/dto/mart/update-coupon.dto';
import {
  MartProductCouponEntity,
  MartProductCouponUsedEntity,
} from 'src/entities';
import { DataSource, EntityRepository, Repository } from 'typeorm';

@EntityRepository(MartProductCouponUsedEntity)
export class MartProductCouponUsedRepo extends Repository<MartProductCouponUsedEntity> {
  constructor(private dataSource: DataSource) {
    super(MartProductCouponUsedEntity, dataSource.createEntityManager());
  }

  async checkUsedByUser(body: UpdateCouponDto) {
    return this.createQueryBuilder('u')
      .leftJoin(MartProductCouponEntity, 'c', 'c.id = u.couponId')
      .where('u.userId = :userId', {
        userId: body.userId,
      })
      .andWhere('c.couponCode = :code', {
        code: body.couponCode,
      })
      .getRawOne();
  }
}
