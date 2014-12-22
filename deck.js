var _ = require('underscore'),
    Defaults = require('./defaults'),
    GemCard = require('./gemcard'),
    ClueCard = require('./cluecard');

var Deck = function () {
  var gemCards = [],
      clueCards = [],
      mysteryGem;
  this.usedClueCards = [];
  this.tableCards = [];
  
  var createDeck = function () {
    createGemDeck();
    createClueDeck();
  };

  var createGemDeck = function () {
    Defaults.types.forEach(function (type) {
      Defaults.colors.forEach(function (color) {
        Defaults.numbers.forEach(function (num) {
          var c = new GemCard(type, num, color);
          gemCards.push(c);
        });
      });
    });
    gemCards = _.shuffle(gemCards);
    var j = Math.floor(Math.random() * (gemCards.length + 1));
    mysteryGem = gemCards.splice(j, 1)[0];
  };

  var createClueDeck = function () {
    clueCards = Defaults.clueCardStrings.map(function (string) {
      var c = new ClueCard(string);
      return c;
    });
    clueCards = _.shuffle(clueCards);
  };

  this.dealGemCards = function (players, tableCards) {
    var numPlayers = players.length,
        numTableCards = gemCards.length % numPlayers,
        numCardsToDeal = gemCards.length - numTableCards;
    console.log(numCardsToDeal/numPlayers + ' gem cards each');
    console.log(numTableCards + ' gem cards on the table');
    this.tableCards = gemCards.splice(numTableCards * -1, numTableCards);
    gemCards.forEach(function (card, index) {
      players[index % numPlayers].addGemCard(card);
    });
  };

  this.dealClueCards = function (players) {
    var numPlayers = players.length,
        numClues = numPlayers * 4;
    for (var i = 0; i < numClues && clueCards.length > 0; i++) {
      var card = clueCards.splice(0, 1)[0];
      players[i % numPlayers].addClueCard(card);
    }
  };

  this.pickNewClueCard = function () {
    if (clueCards.length === 0) {
      clueCards = _.shuffle(this.usedClueCards);
      this.usedClueCards = [];
    }
    return clueCards.splice(0, 1)[0];
  };

  this.exchangeClueCards = function (playerCards) {
    this.usedClueCards = this.usedClueCards.concat(playerCards);
    if (clueCards.length < 4) {
      clueCards = clueCards.concat(_.shuffle(this.usedClueCards));
      this.usedClueCards = [];
    }
    return clueCards.splice(0, 4);
  };

  this.discardClueCard = function (card) {
    this.usedClueCards.push(card);
  };

  this.checkMysteryGem = function (guess) {
    return guess === mysteryGem;
  };

  createDeck();
};

module.exports = Deck;
