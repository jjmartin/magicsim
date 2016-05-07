var _ = require("lodash");
var Shuffle = require("mtg-shuffle");
var EventEmitter = require('events').EventEmitter,
    util = require('util');

function Player(deck, name) {
    var self = this;
    self.hand = [];
    self.deck = deck;
    self.library = null;  // set by Game
    self.name = name || "player";
}

function initialDraw(game) {
    //assume library has been set by the game
    var self = this;
    self.hand = self.library.draw(7);
    console.log(self.name, "drew 7 cards: ", JSON.stringify(self.hand));
    console.log(self.name, "cards left in library:", self.library.cards.length);
}



util.inherits(Player, EventEmitter);

Player.prototype.initialDraw = initialDraw;

module.exports = Player;