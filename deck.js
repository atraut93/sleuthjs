var Util = require('./util'),
    GemCard = require('./gemcard'),
    ClueCard = require('./cluecard');

var Deck = function () {
  var _gemCards = [],
      _clueCards = [],
      _mysteryGem;
  this.usedClueCards = [];
  this.tableCards = [];
  
  var createDeck = function () {
    createGemDeck();
    createClueDeck();
  };

  var createGemDeck = function () {
    Util.types.forEach(function (type) {
      Util.colors.forEach(function (color) {
        Util.numbers.forEach(function (num) {
          var c = new GemCard(type, num, color);
          _gemCards.push(c);
        });
      });
    });
    _gemCards = Util.shuffle(_gemCards);
    var j = Math.floor(Math.random() * (_gemCards.length + 1));
    _mysteryGem = _gemCards.splice(j, 1)[0];
  };

  var createClueDeck = function () {
    _clueCards = Util.clueCardStrings.map(function (string) {
      var c = new ClueCard(string);
      return c;
    });
    _clueCards = Util.shuffle(_clueCards);
  };

  this.dealGemCards = function (players, tableCards) {
    var numPlayers = players.length,
        numTableCards = _gemCards.length % numPlayers,
        numCardsToDeal = _gemCards.length - numTableCards;
    console.log(numCardsToDeal/numPlayers + ' gem cards each');
    console.log(numTableCards + ' gem cards on the table');
    this.tableCards = _gemCards.splice(numTableCards * -1, numTableCards);
    _gemCards.forEach(function (card, index) {
      players[index % numPlayers].addGemCard(card);
    });
  };

  this.dealClueCards = function (players) {
    var numClues = players.length * 4;
    for (var i = 0; i < numClues && i < _clueCards.length; i++) {
      players[i % players.length].addClueCard(_clueCards[i]);
    }
  };

  this.pickNewClueCard = function () {
    if (_clueCards.length === 0) {
      _clueCards = Util.shuffle(this.usedClueCards);
      usedClueCards = [];
    }
    return _clueCards.splice(0, 1)[0];
  };

  this.playClueCard = function (card) {
    usedClueCards.push(card);
  };

  this.checkMysteryGem = function (guess) {
    return guess === _mysteryGem;
  };

  createDeck();
};

module.exports = Deck;
