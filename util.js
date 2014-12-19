var Util = {
  types: ['Opal', 'Pearl', 'Diamond'],
  colors: ['Red', 'Yellow', 'Green', 'Blue'],
  numbers: ['Solitaire', 'Pair', 'Cluster'],
  clueCardStrings: ['Opal Pair', 'Opal', 'Opal ?', 'Red Opal', '?', 'Opal Solitaire'],
  shuffle: function (array) {
    //Fisher-Yates algorithm from http://tamas.io/online-card-game-with-node-js-and-socket-io-episode-1/
    var i = array.length, j, tempi, tempj;
    if (i === 0) return array;
    while (--i) {
       j = Math.floor(Math.random() * (i + 1));
       tempi = array[i];
       tempj = array[j];
       array[i] = tempj;
       array[j] = tempi;
     }
    return array;
  }
};

module.exports = Util;
