import { Injectable } from '@nestjs/common';
import { HttpRespone } from 'src/config/base-respone.config';
import { MartProductRepo } from 'src/repositories/mart/product.repository';
import * as XLSX from 'xlsx';

@Injectable()
export class ExportService {
  constructor(private productRepo: MartProductRepo) {}

  async exportProduct() {
    const data = await this.productRepo.find();
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['test1'],
    };

    const buffer = await XLSX.write(workbook, {
      type: 'array',
      bookType: 'xlsx',
    });
    return new HttpRespone().build({
      message: 'Export',
      buffer: buffer,
    });
  }
}
