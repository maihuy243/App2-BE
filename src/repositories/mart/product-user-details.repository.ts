import { MartProductUserDetailsEntity } from 'src/entities';
import { DataSource, EntityRepository, Repository } from 'typeorm';

@EntityRepository(MartProductUserDetailsEntity)
export class MartProductUserRepo extends Repository<MartProductUserDetailsEntity> {
  constructor(private dataSource: DataSource) {
    super(MartProductUserDetailsEntity, dataSource.createEntityManager());
  }
}
