var _ = require("lodash");
var Shuffle = require("shuffle");
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

    _.forEach(players, function (player) {
        self.libraries.push(Shuffle.shuffle({ deck: player.deck.cards }));
        
        self.addListener('shuffled', player.initialDraw);
        
    });
    self.emit('shuffled');
}

util.inherits(Game, EventEmitter);
module.exports = Game;