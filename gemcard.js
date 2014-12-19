var Util = require('./util');

var GemCard = function (type, number, color) {
  this.gemType = type;
  this.numberString = number;
  this.number = Util.numbers.indexOf(this.numberString) + 1;
  this.color = color;
};

GemCard.prototype.toString = function () {
  return this.color + ' ' + this.gemType + ' ' + this.numberString;
};

module.exports = GemCard;
