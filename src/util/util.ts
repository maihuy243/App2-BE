import { Constant } from 'src/config/Constant';
import { RankEnum } from 'src/enum/discount-by-rank.enum';

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

  getRankByPoint(listRank, point): RankEnum {
    if (!listRank || !point || !listRank.length) return RankEnum.SILVER;
    const findRankByPoint = listRank.find((i) => point >= i.pointRequired);
    console.log('listRank', listRank);

    return findRankByPoint?.rank || RankEnum.SILVER;
  }
}
