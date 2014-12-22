var Util = require('./util');

var ClueCard = function (clueString) {
  var clueParts = clueString.split(' ');
  clueParts.forEach(function (part) {
    if (part === '?') {
      this.freeChoice = true;
    } else if (Util.types.indexOf(part) !== -1) {
      this.gemType = part;
    } else if (Util.colors.indexOf(part) !== -1) {
      this.color = part;
    } else if (Util.numbers.indexOf(part) !== -1) {
      this.number = part;
    }
  }, this);
};

ClueCard.prototype.toString = function () {
  return (this.color ? this.color + ' ' : '') 
          + (this.gemType ? this.gemType + ' ' : '')
          + (this.number ? this.number + ' ' : '')
          + (this.freeChoice ? 'Free Choice' : '');
};

module.exports = ClueCard;
