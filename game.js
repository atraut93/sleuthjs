var Deck = require('./deck'),
    Player = require('./player');

var Game = function (numPlayers) {
  this.players = [];
  var _deck;

  for (var i = 0; i < numPlayers; i++) {
    var p = new Player(i+1, i === 0);
    this.players.push(p);
  }

  _deck = new Deck();
  _deck.dealGemCards(this.players);
  _deck.dealClueCards(this.players);
  console.log('Table Cards:');
  _deck.tableCards.forEach(function (card) {
    console.log(card.toString());
  });

  console.log('\nPlayers:\n', this.players);

  this.play = function () {
    var mysteryGemGuessed = false;
    while (!mysteryGemGuessed) {
      console.log('Turn 1');
      mysteryGemGuessed = true;
    }
  };
};

module.exports = Game;
