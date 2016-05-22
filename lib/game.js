var _ = require("lodash");
var Deck = require("./deck.js");
var EventEmitter = require('events').EventEmitter,
    util = require('util');

//Logging
var log4js = require('log4js');
log4js.configure({
    appenders: [{
        type: 'console'
    }]
});
var log;



function Game(players) {
    EventEmitter.call(this);
    var self = this;
    self.battlefield = {};
    self.exile = [];
    self.players = players;
    self.libraries = [];
    self.stack = {};
    self.gameState = "start";
    log = log4js.getLogger("GAME");

    var phases = [{
        "name": "beginning",
        "function": beginningPhase
    }, {
            "name": "precombat main"
        }, {
            "name": "combat"
        }, {
            "name": "postcombat main"
        }, {
            "name": "ending"
        }];


    _.forEach(players, function(player) {
        const playerDeck = new Deck(player.deck.cards, function() {
            return Math.random();
        });
        var libraryIndex = self.libraries.push(playerDeck) - 1;
        player.library = self.libraries[libraryIndex];
        player.life = 20;
        player.once("ready", playersReadyForTurns);
        self.addListener('shuffled', function() {
            const playerLocal = player;
            playerLocal.initialDraw(self);
        });
        log.info("Initialized player ", player.name);
        if (player === self.players[0]) {
            log.info("103.2 Player ", player.name, " will have the first turn.");
        }
    });

    var playerReadyCount = 0;

    function playersReadyForTurns(player) {
        playerReadyCount++;
        player.on("passPriority", playerPassPriority);
        log.info("player", player.name, "reported ready");
        if (playerReadyCount === self.players.length) {
            log.info("Starting Turns");
            playerReadyCount = 0;
            self.turn = 0;
            startTurnLoop();
        }
    }

    function start() {
        _.forEach(self.libraries, function(library) {
            log.info("103.1 Shuffling Libraries");
            library.shuffle();
        });
        self.activePlayer = self.players[0];
        self.emit('shuffled');
    }

    function startTurnLoop() {
        self.turn++;
        log.trace("Starting turn ", self.turn);
        beginningPhase.call();
    }

    function beginningPhase() {
        log.trace("501. Beginning Phase");
        self.phase = "beginning";
        log.info("502. Untap Step");
        self.step="untap";
        self.emit("untapStep");
        self.activePlayer.untap();
    }

    function playerPassPriority(player) {
        log.info("player", player.name, "passed priority");
        if (self.players.every((player) => player.passedPriority)) {
            log.info("All players passed priority.");
            nextPhase();
        }
    }

    function nextPhase() {

    }

    Game.prototype.start = start;

}


util.inherits(Game, EventEmitter);
module.exports = Game;