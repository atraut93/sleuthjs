var inquirer = require('inquirer');

var Player = function (index, human) {
  var _gemCards = [],
      self = this;
  self.clueCards = [];
  self.name = ('Player ' + index);
  self.human = human || false;
  self.guessedIncorrectly = false;

  this.addGemCard = function (card) {
    _gemCards.push(card);
  };

  if (this.human) {
    this.displayCards = function () {
      console.log('-----Gem Cards:');
      _gemCards.forEach(function (card) {
        console.log(card.toString());
      });
      console.log('-----Clue Cards:')
      self.clueCards.forEach(function (card) {
        console.log(card.toString());
      });
    }
  }

  this.addClueCard = function (card) {
    this.clueCards.push(card);
  };

  this.playClueCard = function (playerOptions, callback) {
    if (self.human) {
      inquirer.prompt([{
        type: 'list',
        name: 'clueCardChoice',
        message: 'Choose a clue card',
        choices: function () {
          return self.clueCards.map(function (card, index) {
            return {
              name: card.toString(),
              value: index
            }
          });
        }
      },
      {
        type: 'list',
        name: 'playerChoice',
        message: 'Choose a player to ask',
        choices: function () {
          return playerOptions.map(function (player, index) {
            return {
              name: player.name,
              value: index
            };
          });
        }
      }], function (answers) {
        console.log(answers.clueCardChoice);
        console.log(answers.playerChoice);
        callback();
      });
    } else {
      callback();
    }
  };
};

module.exports = Player;
