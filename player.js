var Player = function (index, human) {
  var gemCards = [];
  this.clueCards = [];
  this.name = ('Player ' + index);
  this.human = human || false;

  this.addGemCard = function (card) {
    gemCards.push(card);
  };

  this.addClueCard = function (card) {
    this.clueCards.push(card);
  };

};

module.exports = Player;
