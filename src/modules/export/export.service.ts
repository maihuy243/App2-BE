import { Injectable } from '@nestjs/common';
import { HttpRespone } from 'src/config/base-respone.config';
import { MartProductRepo } from 'src/repositories/mart/product.repository';
import * as ExcelJS from 'exceljs';
import { uploadToS3, getUrlFromS3 } from 'src/util/s3-services';
import * as moment from 'moment';
import { Constant } from 'src/config/Constant';

const columnsProducts = [
  { header: 'Id', key: 'id' },
  { header: 'Name', key: 'name' },
  { header: 'Code', key: 'code' },
  { header: 'Price', key: 'price' },
  { header: 'Standar', key: 'standar' },
  { header: 'Sale', key: 'sale' },
  { header: 'Discount', key: 'discount' },
  { header: 'Price Discount', key: 'priceDiscount' },
  { header: 'Category', key: 'type' },
  { header: 'Quantity', key: 'stockOut' },
];
@Injectable()
export class ExportService {
  constructor(private productRepo: MartProductRepo) {}

  async exportProduct() {
    const PREFIX = Constant.PREFIX_TYPE.PRODUCTS;
    const data = await this.productRepo.getList({ isAll: true });

    if (!data || !data.length) {
      return new HttpRespone().build({
        message: 'There are no products in stock',
        type: 'error',
      });
    } else {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('products');
      worksheet.columns = columnsProducts;

      for (const product of data) {
        worksheet.addRow({
          id: product.id,
          name: product.productName,
          code: product.productCode,
          standar: product.standar,
          sale: product.sale,
          stockOut: Number(product.stockOut),
          discount: Number(product.discount),
          priceDiscount: product.priceDiscount,
          price: product.price,
          type: product.type,
        });
      }

      let buffer: any;
      const nameFile: string =
        'products_' + moment().format('yyyyMMDD') + '.xlsx';

      await workbook.xlsx
        .writeBuffer()
        .then((buf) => {
          buffer = buf;
        })
        .catch(() => {
          buffer = null;
        });


      console.log('testCommentFromGitHub');
      

      try {
        if (!buffer) {
          return new HttpRespone().build({
            message: 'Export faild -- No Buffer',
            type: 'error',
          });
        }

        await uploadToS3(buffer, PREFIX + nameFile);
        const url = await getUrlFromS3(PREFIX + nameFile);

        return new HttpRespone().build({
          message: url ? 'Export success' : 'Export faild',
          type: url ? 'success' : 'error',
          url: url,
        });
      } catch (error) {
        console.error('error', error);

        return new HttpRespone().build({
          message: 'Export faild',
          type: 'error',
        });
      }
    }
  }
}
