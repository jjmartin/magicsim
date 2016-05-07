var _ = require("lodash");
var Shuffle = require("mtg-shuffle");
var EventEmitter = require('events').EventEmitter,
    util = require('util');



function Game(players) {
    EventEmitter.call(this);
    var self = this;
    self.battlefield = {};
    self.exile = [];
    self.players = players;
    self.libraries = [];
    self.stack = {};
    self.gameState = "start";

    _.forEach(players, function(player) {
        var libraryIndex = self.libraries.push(Shuffle.shuffle({ deck: player.deck.cards })) - 1;
        player.library = self.libraries[libraryIndex];
        self.addListener('shuffled', function(){
            let playerLocal = player;
          playerLocal.initialDraw(self);  
        } );

    });
    self.emit('shuffled');
}
util.inherits(Game, EventEmitter);
module.exports = Game;