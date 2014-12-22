var _ = require('underscore');

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

  this.queryGems = function (clueCard) {
    var matchingGems = _.filter(gemCards, _.matches(clueCard));
    if (_.keys(clueCard).length === 1) {
      return matchingGems.length;
    } else {
      return _.isEmpty(matchingGems) ? 0 : matchingGems;
    }
  };

};

module.exports = Player;
