var Deck = require('./deck'),
    GemCard = require('./gemcard'),
    Player = require('./player'),
    Util = require('./util'),
    inquirer = require('inquirer');

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

  this.play = function () {
    innerPlay(0);
  };

  var innerPlay = function (turn) {
    var currPlayer = self.players[turn % self.players.length];
    if (currPlayer.guessedIncorrectly || turn > 10) {
      innerPlay(turn + 1);
      return;
    }
    if (currPlayer.human) {
        inquirer.prompt({
          type: 'list',
          name: 'turnChoice',
          message: 'It\'s your turn.  What would you like to do?',
          choices: [
          {
            name: 'Use clue card',
            value: 'play'
          },
          {
            name: 'Exchange clue cards',
            value: 'exchange'
          },
          {
            name: 'View your hand',
            value: 'view'
          },
          {
            name: 'Guess Mystery Gem',
            value: 'guess'
          }
          ]
        }, function (answers) {
          if (answers.turnChoice === 'play') {
            var filteredPlayers = self.players.filter(function (player) {
              return player !== currPlayer;
            });
            currPlayer.playClueCard(filteredPlayers, function () {
              innerPlay(turn + 1);
            });
          } else if (answers.turnChoice === 'exchange') {
            currPlayer.clueCards = _deck.exchangeClueCards(currPlayer.clueCards);
            innerPlay(turn + 1);
          } else if (answers.turnChoice === 'view') {
            currPlayer.displayCards();
            innerPlay(turn);
          } else {
            guessGem(function (correct) {
              if (correct) {
                console.log('YAY');
              } else {
                console.log('Darn :(');
                currPlayer.guessedIncorrectly = true;
                innerPlay(turn + 1);
              }
            });
          }
        });
    } else {
      console.log('Computer player turn (' + currPlayer.name + ')');
      innerPlay(turn + 1);
      return;
    }
  }

  var guessGem = function (callback) {
    inquirer.prompt(
      [{
        type: 'list',
        name: 'gemColor',
        message: 'Mystery Gem Color:',
        choices: Util.colors
      },
      {
        type: 'list',
        name: 'gemType',
        message: 'Mystery Gem Type:',
        choices: Util.types
      },
      {
        type: 'list',
        name: 'gemNumber',
        message: 'Mystery Gem Number:',
        choices: Util.numbers
      }],
      function (answers) {
        var guess = new GemCard(answers.gemType, answers.gemNumber, answers.gemColor);
        callback(_deck.checkMysteryGem(guess));
    });
  }
};

module.exports = Game;
