var Defaults = require('./defaults');

var GemCard = function (type, number, color) {
  this.gemType = type;
  this.numberString = number;
  this.number = Defaults.numbers.indexOf(this.numberString) + 1;
  this.color = color;
};

GemCard.prototype.toString = function () {
  return this.color + ' ' + this.gemType + ' ' + this.numberString;
};

module.exports = GemCard;
