import { MartProductEntity, MartProductInventoryEntity } from 'src/entities';
import { DataSource, EntityRepository, Repository } from 'typeorm';

@EntityRepository(MartProductEntity)
export class MartProductRepo extends Repository<MartProductEntity> {
  constructor(private dataSource: DataSource) {
    super(MartProductEntity, dataSource.createEntityManager());
  }

  async findProduct(key: string, value: any) {
    const query = this.createQueryBuilder('b').where('b.isDelete = false');

    switch (key) {
      case 'id':
        query.andWhere('b.id = :id', {
          id: value,
        });
        break;
      case 'productCode':
        query.andWhere('b.productCode = :productCode', {
          productCode: value,
        });
        break;
      default:
        break;
    }

    return await query.getOne();
  }

  async getList(queryPayload: any) {
    const query = this.createQueryBuilder('p');
    query
      .leftJoinAndSelect(MartProductInventoryEntity, 'i', 'i.productId = p.id')
      .where('p.isDelete = false');

    // search
    if (Object.keys(queryPayload).length) {
      if (queryPayload.type) {
        query.andWhere('p.type = :type', {
          type: queryPayload.type,
        });
      }
    }

    // end Search
    query
      .select([
        'p.id ',
        'p.productName as "productName"',
        'p.price ',
        'p.type ',
        'p.standar ',
        'p.productCode as "productCode"',
        'p.sale ',
        'p.discount ',
        'p.priceDiscount as "priceDiscount" ',
        'i.totalQuantity as "totalQuantity"',
      ])
      .orderBy('p.productCode', 'DESC');

    return await query.getRawMany();
  }

  async getListStockOut() {
    return await this.createQueryBuilder('p')
      .select('i.type as type')
      .addSelect('SUM(i.totalQuantity) as totalQuantity')
      .leftJoin(MartProductInventoryEntity, 'i', 'p.id = i.productId')
      .where('i.totalQuantity > 0')
      .groupBy('i.type')
      .getRawMany();
  }
}
