var _ = require("lodash");
var Deck = require("./deck.js");
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
        const playerDeck = new Deck(player.deck.cards, function(){ return Math.random(); });
        var libraryIndex = self.libraries.push(playerDeck) - 1;
        player.library = self.libraries[libraryIndex];
        self.addListener('shuffled', function() {
            const playerLocal = player;
            playerLocal.initialDraw(self);
        });

    });
    self.emit('shuffled');
}
util.inherits(Game, EventEmitter);
module.exports = Game;