var Deck = require('./deck'),
    GemCard = require('./gemcard'),
    Player = require('./player'),
    Util = require('./util');

var Game = function (numPlayers) {
  var self = this;
  self.players = [];
  var _deck;

  for (var i = 0; i < numPlayers; i++) {
    var p = new Player(i+1, i === 0);
    self.players.push(p);
  }

  _deck = new Deck();
  _deck.dealGemCards(self.players);
  _deck.dealClueCards(self.players);
  console.log('Table Cards:');
  _deck.tableCards.forEach(function (card) {
    console.log(card.toString());
  });

  console.log('\nPlayers:\n', self.players);

};

module.exports = Game;
