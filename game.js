var Deck = require('./deck'),
    Player = require('./player'),
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
    innerPlay(0, false);
  };

  var innerPlay = function (turn, mysteryGemGuessed) {
    // console.log('Turn ', turn + 1);
    var currPlayer = self.players[turn % self.players.length];
    if (mysteryGemGuessed) {
      console.log('someone won!');
    } else if (currPlayer.human) {
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
            currPlayer.playClueCard(self.players, function () {
              innerPlay(turn+1, mysteryGemGuessed);
            });
          } else if (answers.turnChoice === 'exchange') {
            currPlayer.clueCards = _deck.exchangeClueCards(currPlayer.clueCards);
            innerPlay(turn+1, mysteryGemGuessed);
          } else if (answers.turnChoice === 'view') {
            currPlayer.displayCards();
            innerPlay(turn, mysteryGemGuessed);
          } else {
            console.log('guess mystery gem');
            innerPlay(turn+1, mysteryGemGuessed);
          }
        });
    } else {
      console.log('Computer player turn (' + currPlayer.name + ')');
      innerPlay(turn+1, true);
    }
  }
};

module.exports = Game;
