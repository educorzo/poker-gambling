export default class CardTextureNameConverter{

 /*
 * @param value {string}
 * @return object
 */
  getTexturesNames(value) {
    var rank, suit, color;

    if(!/^[23456789TJKQA][cshd]$/.test(value)) {
      throw new Error(`Invalid value: ${value}`);
    }

    rank = value.charAt(0),
    suit = value.charAt(1),
    color = this._getColor(suit);

    return {
      rank : `${color}_${rank}.png`,
      suit : `${suit}_big.png`,
      suitCorner :  `${suit}_small.png`
    };
  }

  _getColor(suit) {
    if (suit === 's' || suit === 'c')
    {
      return '0';
    }

    return '1';
  }
}
