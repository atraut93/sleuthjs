var Game = require('./game'),
    inquirer = require('inquirer');

inquirer.prompt({
  type: 'input',
  name: 'players',
  message: 'How many computer players do you want to play against? (2-6)',
  default: 2,
  validate: function (input) {
    input = parseInt(input, 10);
    if (typeof input !== 'number' || isNaN(input)) {
      return 'Please enter a number';
    } else {
      return input >= 2 && input <= 6;
    }
  }
}, function (answers) {
  var numPlayers = parseInt(answers.players, 10);

  var game = new Game(numPlayers + 1);
  game.play();
});

