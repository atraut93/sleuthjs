var Deck = require('./deck'),
    Player = require('./player');

var Game = function (numPlayers) {
  this.players = [];
  var deck = new Deck();

  for (var i = 0; i < numPlayers; i++) {
    var p = new Player(i+1, i === 0);
    this.players.push(p);
  }

  deck.dealGemCards(this.players);
  deck.dealClueCards(this.players);
  console.log('Table Cards:');
  deck.tableCards.forEach(function (card) {
    console.log(card.toString());
  });

  console.log();

  this.players.forEach(function (player) {
    console.log(player.name + ' (' + (player.human ? 'human' : 'computer') + ')');
    player.clueCards.forEach(function (card) {
      console.log(card.toString());
    });
  })

};

module.exports = Game;
