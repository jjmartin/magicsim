var _ = require("lodash");



function Game(players) {
    var self = this;
    self.battlefield = {};
    self.exile = {};
    self.players = players;
    self.libraries = [];
    self.stack = {};
    self.gameState = "start";

    _.forEach(players, function(player) {
        var index = self.libraries.push({});
        self.libraries[index - 1].cards = _.clone(player.deck.cards);
    });

}


module.exports = Game;