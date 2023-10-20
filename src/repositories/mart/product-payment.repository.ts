import { MartProductPaymentEntity } from 'src/entities';
import { DataSource, EntityRepository, Repository } from 'typeorm';

@EntityRepository(MartProductPaymentEntity)
export class MartProductPaymentRepo extends Repository<MartProductPaymentEntity> {
  constructor(private dataSource: DataSource) {
    super(MartProductPaymentEntity, dataSource.createEntityManager());
  }

  async getDataSale() {
    return await this.createQueryBuilder('p')
      .select([
        `DATE_TRUNC('month',date_payment) as month`,
        'SUM(p.total_price) as Total',
      ])
      .groupBy(`DATE_TRUNC('month',date_payment)`)
      .getRawMany();
  }
}
