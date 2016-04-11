var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var chaiAsPromised = require("chai-as-promised");
chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);

var Game = require("../lib/game");

describe("game", function() {
    describe("init", function() {
        it("has puts players decks into library", function() {
            var players = [
                {
                    name: "player1",
                    deck: {
                        cards: [
                            { name: "Island" }
                        ]
                    }
                },
                {
                    name: "player2",
                    deck: {}
                }
            ];
            var game = new Game(players);
            game.libraries[0].cards.length.should.be.equal(players[0].deck.cards.length);
        });
    });
});