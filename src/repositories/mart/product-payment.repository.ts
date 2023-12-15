import { MartProductPaymentEntity, UserEntity } from 'src/entities';
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
        'ROUND(SUM(p.total_price::float)) as Total',
      ])
      .groupBy(`DATE_TRUNC('month',date_payment)`)
      .getRawMany();
  }

  async getListPayment() {
    return await this.createQueryBuilder('p')
      .leftJoin(UserEntity, 'u', 'u.id = p.userId')
      .orderBy('p.date_payment', 'DESC')
      .select([
        'p.date_payment as "datePayment"',
        'p.paymentType as "paymentType"',
        'p.discountByCoupon as "discountByCoupon" ',
        'p.shippingCharges as "shippingCharges"',
        'p.data as data',
        'p.totalPrice as "totalPrice"',
        'p.point ',
        'u.username ',
        'p.id ',
      ])
      .getRawMany();
  }
}
