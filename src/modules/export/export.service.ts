import { Injectable } from '@nestjs/common';
import { HttpRespone } from 'src/config/base-respone.config';
import { MartProductRepo } from 'src/repositories/mart/product.repository';
import * as ExcelJS from 'exceljs';
import { uploadToS3 } from 'src/config/aws-handle';
import * as moment from 'moment';

@Injectable()
export class ExportService {
  constructor(private productRepo: MartProductRepo) {}

  async exportProduct() {
    const data = await this.productRepo.find();

    if (!data || !data.length) {
      return new HttpRespone().build({
        message: 'There are no products in stock',
        type: 'error',
      });
    } else {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('products');

      for (const product of data) {
        worksheet.addRow(product);
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

      if (buffer) {
        const upload = uploadToS3(buffer, '/products/' + nameFile);
        console.log('upload', upload);
      }

      return new HttpRespone().build({
        message: buffer ? 'Export success' : 'Export faild',
        type: buffer ? 'success' : 'error',
        buffer: buffer,
      });
    }
  }
}
