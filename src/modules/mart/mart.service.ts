import { MartProductUserRepo } from './../../repositories/mart/product-user-details.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpRespone } from 'src/config/base-respone.config';
import {
  MartCardDto,
  ProductCardDto,
} from 'src/dto/mart/mart-product-cart.dto';
import { MartProductDto } from 'src/dto/mart/mart-product.dto';
import {
  MartProductCartEntity,
  MartProductEntity,
  MartProductInventoryEntity,
  MartProductPaymentEntity,
} from 'src/entities';
import { AuthRepo } from 'src/repositories/auth.repository';
import { MartProductCardRepo } from 'src/repositories/mart/product-card.repository';
import { MartProductCountRepo } from 'src/repositories/mart/product-count.repository';
import { MartProductInventoryRepo } from 'src/repositories/mart/product-inventory.repository';
import { MartProductPaymentRepo } from 'src/repositories/mart/product-payment.repository';
import { MartProductRepo } from 'src/repositories/mart/product.repository';
import { Util } from 'src/util/util';
import { DataSource } from 'typeorm';

@Injectable()
export class MartService {
  constructor(
    private productRepo: MartProductRepo,
    private dataSource: DataSource,
    private productCountRepo: MartProductCountRepo,
    private util: Util,
    private cartRepo: MartProductCardRepo,
    private paymentRepo: MartProductPaymentRepo,
    private detailsUserRepo: MartProductUserRepo,
    private inventoryRepo: MartProductInventoryRepo,
    private authRepo: AuthRepo,
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

  async createCart(body: MartCardDto) {
    const checkAccount = await this.authRepo.findOneBy({ id: body.userId });

    if (!checkAccount) {
      throw new HttpException('User not found', HttpStatus.FORBIDDEN);
    }

    const checkExistCardByUser = await this.cartRepo.findOneBy({
      userId: body.userId,
    });

    if (checkExistCardByUser) {
      await this.cartRepo.update(
        { userId: body.userId },
        {
          totalPrice: body.totalPrice,
          data: JSON.stringify(body),
          coupon: body.useCoupon ? body.coupon : null,
        },
      );
      return new HttpRespone().build({
        message: 'Update card success',
      });
    } else {
      const cartEntity = this.cartRepo.create({
        userId: body.userId,
        totalPrice: body.totalPrice,
        data: JSON.stringify(body),
        coupon: body.useCoupon ? body.coupon : null,
      });

      await this.cartRepo.save(cartEntity);

      return new HttpRespone().build({
        message: 'Create card success',
      });
    }
  }

  async getCard(query) {
    if (!query.userId) {
      return new HttpRespone().buildError({
        message: 'User not found',
      });
    }

    const card = await this.cartRepo.findOneBy({ userId: query.userId });
    if (!card) {
      return new HttpRespone().build({
        data: card,
      });
    }

    return new HttpRespone().build({
      data: JSON.parse(card.data),
    });
  }

  async payment(body: MartCardDto) {
    const checkAccount = await this.authRepo.findOneBy({ id: body.userId });

    if (!checkAccount) {
      throw new HttpException('User not found', HttpStatus.FORBIDDEN);
    }

    if (!body.paymentType) {
      return new HttpRespone().buildError({
        message: 'Please select payment method',
      });
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // taọ record payment
      await queryRunner.manager.save(MartProductPaymentEntity, {
        userId: body.userId,
        paymentType: body.paymentType,
        data: JSON.stringify(body),
        totalPrice: body.totalPrice,
        point: body.point,
      });

      // xóa giỏ hàng
      await queryRunner.manager.delete(MartProductCartEntity, {
        userId: body.userId,
      });

      // update point cho user
      const getDetailUser = await this.detailsUserRepo.findOneBy({
        userId: body.userId,
      });

      if (getDetailUser) {
        await queryRunner.manager.update(
          MartProductPaymentEntity,
          { userId: body.userId },
          { ...getDetailUser, point: getDetailUser.point + body.point },
        );
      } else {
        await queryRunner.manager.save(MartProductPaymentEntity, {
          ...getDetailUser,
          point: body.point,
        });
      }

      // set tồn kho cho sản phẩm

      body.products.forEach(async (i: ProductCardDto) => {
        const inventoryByProduct = await this.inventoryRepo.findOneBy({
          productId: i.productId,
        });
        await queryRunner.manager.update(
          MartProductInventoryEntity,
          { productId: i.productId },
          {
            totalQuantity:
              inventoryByProduct.totalQuantity - i.quantity > 0
                ? inventoryByProduct.totalQuantity - i.quantity
                : 0,
          },
        );
      });

      await queryRunner.commitTransaction();

      return new HttpRespone().build({
        message: 'Payment success',
      });
    } catch (error) {
      console.log('error', error);

      await queryRunner.rollbackTransaction();
      return new HttpRespone().buildError({
        message: 'Payment error',
      });
    } finally {
      await queryRunner.release();
    }
  }
}
