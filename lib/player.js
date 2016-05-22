var _ = require("lodash");

var EventEmitter = require('events').EventEmitter,
    util = require('util');

//Logging
var log4js = require('log4js');
log4js.configure({
    appenders: [{
        type: 'console'
    }]
});


function Player(options) {
    var self = this;
    self.hand = [];
    self.deck = options.deck;
    self.library = null;  // set by Game
    self.name = options.name || "player";
    self.log = log4js.getLogger("Player:" + self.name);
    self.permanentsControlled = [];
}

function initialDraw(game) {
    //assume library has been set by the game
    var self = this;
    self.game = game;
    self.log.info("103.4 ", self.name, "drawing 7 cards");
    self.hand = self.library.draw(7);
    self.log.info(self.name, "drew 7 cards: ", JSON.stringify(self.hand));
    self.log.info(self.name, "cards left in library:", self.library.cards.length);
    self.log.info("103.5 Opening hand actions not implmented");
    self.emit("ready", self);
}

function untap() {
    var self = this;
    self.log.info("Untap Step");
    _.forEach(self.permanentsControlled, function(permanent) {
        self.log.info("untapping", permanent.name);
        permanent.untap();
    });
}

util.inherits(Player, EventEmitter);

Player.prototype.initialDraw = initialDraw;
Player.prototype.untap = untap;

module.exports = Player;