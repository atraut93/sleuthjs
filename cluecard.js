var Defaults = require('./defaults');

var ClueCard = function (clueString) {
  var clueParts = clueString.split(' ');
  clueParts.forEach(function (part) {
    if (part === '?') {
      this.freeChoice = true;
    } else if (Defaults.types.indexOf(part) !== -1) {
      this.gemType = part;
    } else if (Defaults.colors.indexOf(part) !== -1) {
      this.color = part;
    } else if (Defaults.numbers.indexOf(part) !== -1) {
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
