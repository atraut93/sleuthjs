var Game = require('./game');

var numPlayers = parseInt(process.argv[2], 10) || 3;
var game = new Game(numPlayers);
