var Player = function (index, human) {
  var _gemCards = [];
  this.clueCards = [];
  this.name = ('Player ' + index);
  this.human = human || false;

  this.addGemCard = function (card) {
    _gemCards.push(card);
  };

  this.addClueCard = function (card) {
    this.clueCards.push(card);
  };
};

module.exports = Player;
