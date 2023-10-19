import { MartProductPaymentEntity } from 'src/entities';
import { DataSource, EntityRepository, Repository } from 'typeorm';

@EntityRepository(MartProductPaymentEntity)
export class MartProductPaymentRepo extends Repository<MartProductPaymentEntity> {
  constructor(private dataSource: DataSource) {
    super(MartProductPaymentEntity, dataSource.createEntityManager());
  }
}
