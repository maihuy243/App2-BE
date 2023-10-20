import { Constant } from 'src/config/Constant';

export class Util {
  genProductCode(number: number): string {
    const parttern = Constant.PRODUCT_CODE_PARTTERN;
    if (!number) return parttern.STRING;
    const lengthNumber = String(number).length;
    const partternString = parttern.STRING.substring(
      0,
      parttern.LENGTH - lengthNumber,
    );
    return partternString + number;
  }
}
