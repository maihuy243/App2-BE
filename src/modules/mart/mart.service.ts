import { Injectable } from '@nestjs/common';
import { HttpRespone } from 'src/config/base-respone.config';
import { MartProductDto } from 'src/dto/mart/mart-product.dto';
import { MartProductEntity, MartProductInventoryEntity } from 'src/entities';
import { MartProductCountRepo } from 'src/repositories/mart/product-count.repository';
import { MartProductInventoryRepo } from 'src/repositories/mart/product-inventory.repository';
import { MartProductRepo } from 'src/repositories/mart/product.repository';
import { Util } from 'src/util/util';
import { DataSource } from 'typeorm';

@Injectable()
export class MartService {
  constructor(
    private productRepo: MartProductRepo,
    private dataSource: DataSource,
    private productInventoryRepo: MartProductInventoryRepo,
    private productCountRepo: MartProductCountRepo,
    private util: Util,
  ) {}

  async createProduct(body: MartProductDto) {
    const checkExistProduct = await this.productRepo.findProduct(
      'productName',
      body.productName,
    );

    if (checkExistProduct) {
      return new HttpRespone().buildError({
        message: 'The productName already exists',
      });
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    // Begin transaction

    try {
      const checkExistCount = await this.productCountRepo.getCount();

      if (checkExistCount) {
        await this.productCountRepo.update(
          {
            id: checkExistCount.id,
          },
          {
            count: checkExistCount.count + 1,
          },
        );
      } else {
        await this.productCountRepo.save({
          count: 1,
        });
      }
      const count = await this.productCountRepo.getCount();

      const productEntity = this.productRepo.create({
        ...body,
        productCode: this.util.genProductCode(count.count),
      });

      const product = await queryRunner.manager.save(
        MartProductEntity,
        productEntity,
      );
      if (!product) {
        await queryRunner.rollbackTransaction();
        return new HttpRespone().buildError({
          message: 'Create product error',
        });
      }

      await queryRunner.manager.save(MartProductInventoryEntity, {
        productId: product.id,
        totalQuantity: 1,
        type: product.type,
      });
      await queryRunner.commitTransaction();
      return new HttpRespone().build({
        message: 'Create product success',
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return new HttpRespone().buildError({
        message: 'Create product error',
      });
    } finally {
      await queryRunner.release();
    }
  }

  async updateProduct(body: MartProductDto) {
    if (!body.id) {
      return new HttpRespone().buildError({
        message: 'Update product error',
      });
    }

    await this.productRepo.update({ id: body.id }, body);

    return new HttpRespone().build({
      message: 'Update product success',
    });
  }

  async getListProduct(query: string) {
    const listProduct = await this.productRepo.getList(query);
    return new HttpRespone().build({
      data: listProduct,
    });
  }

  async deleteProduct(param: any) {
    const checkExist = await this.productRepo.findProduct('id', param.id);

    if (!checkExist) {
      return new HttpRespone().buildError({ message: 'Product do not exist' });
    }

    await this.productRepo.update({ id: checkExist.id }, { isDelete: true });

    return new HttpRespone().build({ message: 'Delete product success' });
  }

  async getListStockOut() {
    const listStockOut = await this.productRepo.getListStockOut();

    return new HttpRespone().build({
      data: listStockOut,
    });
  }
}
