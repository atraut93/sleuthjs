var Player = function (index, human) {
  var _gemCards = [],
      self = this;
  self.clueCards = [];
  self.name = ('Player ' + index);
  self.human = human || false;
  self.guessedIncorrectly = false;

  this.addGemCard = function (card) {
    _gemCards.push(card);
  };

  if (this.human) {
    this.displayCards = function () {
      console.log('-----Gem Cards:');
      _gemCards.forEach(function (card) {
        console.log(card.toString());
      });
      console.log('-----Clue Cards:')
      self.clueCards.forEach(function (card) {
        console.log(card.toString());
      });
    }
  }

  this.addClueCard = function (card) {
    this.clueCards.push(card);
  };

};

module.exports = Player;
