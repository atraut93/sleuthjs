var Deck = require('./deck'),
    Player = require('./player');

var players = [],
    numPlayers = parseInt(process.argv[2], 10) || 3;

for (var i = 0; i < numPlayers; i++) {
  var p = new Player(i+1);
  players.push(p);
}

var deck = new Deck();
deck.dealGemCards(players);
deck.dealClueCards(players);
console.log('Table Cards:');
deck.tableCards.forEach(function (card) {
  console.log(card.toString());
});

console.log('Players:\n', players);
