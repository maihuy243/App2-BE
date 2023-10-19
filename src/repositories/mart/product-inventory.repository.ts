import { MartProductInventoryEntity } from 'src/entities';
import { DataSource, EntityRepository, Repository } from 'typeorm';

@EntityRepository(MartProductInventoryEntity)
export class MartProductInventoryRepo extends Repository<MartProductInventoryEntity> {
  constructor(private dataSource: DataSource) {
    super(MartProductInventoryEntity, dataSource.createEntityManager());
  }
}
