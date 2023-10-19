import { MartProductImportEntity } from 'src/entities';
import { DataSource, EntityRepository, Repository } from 'typeorm';

@EntityRepository(MartProductImportEntity)
export class MartProductImportRepo extends Repository<MartProductImportEntity> {
  constructor(private dataSource: DataSource) {
    super(MartProductImportEntity, dataSource.createEntityManager());
  }
}
