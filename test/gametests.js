var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var chaiAsPromised = require("chai-as-promised");
chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);

var Game = require("../lib/game");
var Player = require("../lib/player");

describe("game", function() {
    var players;
    beforeEach("set up players", function() {
        players = [
            new Player({
                name: "player1",
                deck: {
                    cards: [{
                        name: "Island"
                    }, {
                            name: "Plains"
                        }, {
                            name: "Swamp"
                        }, {
                            name: "Forest"
                        }, {
                            name: "Mountain"
                        }, {
                            name: "Island"
                        }, {
                            name: "Plains"
                        }, {
                            name: "Swamp"
                        }, {
                            name: "Forest"
                        }, {
                            name: "Mountain"
                        }]
                }
            }),
            new Player({
                name: "player2",
                deck: {
                    cards: [{
                        name: "Wastes"
                    }, {
                            name: "Wastes"
                        }, {
                            name: "Wastes"
                        }, {
                            name: "Wastes"
                        }, {
                            name: "Wastes"
                        }, {
                            name: "Island"
                        }, {
                            name: "Plains"
                        }, {
                            name: "Swamp"
                        }, {
                            name: "Forest"
                        }, {
                            name: "Mountain"
                        }]
                }
            })
        ];
    });

    describe("ctor", function() {

        it("puts players deck into separate libraries (shuffled)", function() {

            var game = new Game(players);
            game.libraries[0].cards.concat(players[0].hand).should.have.members(players[0].deck.cards);
            game.libraries[0].should.equal(players[0].library);
            game.libraries[1].cards.concat(players[1].hand).should.have.members(players[1].deck.cards);
            game.libraries[1].should.equal(players[1].library);
        });
    });
    describe("start", function() {
        it("subscribes players to the shuffled event and emits shuffled",
            function() {
                players[0].initialDraw = sinon.spy();
                players[1].initialDraw = sinon.spy();
                var game = new Game(players);
                var shuffleHandler = sinon.spy();
                game.on('shuffled', shuffleHandler);
                game.start();
                shuffleHandler.should.have.been.called;
                players[0].initialDraw.should.have.been.called;
                players[1].initialDraw.should.have.been.called;
            });

        it("starts turn 1 when players are ready", function(done) {
            var game = new Game(players);
            game.on("untapStep", function() {
                game.turn.should.equal(1);
                done();
            });
            game.start();
        });

        it("at the start of turns, starts phases.", function(done) { 
             var game = new Game(players);
            game.on("untapStep", function() {
                game.phase.should.equal("beginning");
                game.step.should.equal("untap");
                done();
            });
            
            game.start();
        });
    });
});