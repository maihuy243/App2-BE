import { MartProductRankEntity } from 'src/entities';
import { DataSource, EntityRepository, Repository } from 'typeorm';

@EntityRepository(MartProductRankEntity)
export class MartProductRankRepo extends Repository<MartProductRankEntity> {
  constructor(private dataSource: DataSource) {
    super(MartProductRankEntity, dataSource.createEntityManager());
  }
}
