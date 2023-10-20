import { MartProductCartEntity } from 'src/entities';
import { DataSource, EntityRepository, Repository } from 'typeorm';

@EntityRepository(MartProductCartEntity)
export class MartProductCardRepo extends Repository<MartProductCartEntity> {
  constructor(private dataSource: DataSource) {
    super(MartProductCartEntity, dataSource.createEntityManager());
  }
}
