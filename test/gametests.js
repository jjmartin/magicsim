var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var chaiAsPromised = require("chai-as-promised");
chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);

var Game = require("../lib/game");

describe("game", function() {
    describe("ctor", function() {
        
        it("puts players deck into separate libraries (shuffled)", function(){
             var players = [
                {
                    name: "player1",
                    deck: {
                        cards: [
                            { name: "Island" },
                            { name: "Plains" },
                            { name: "Swamp" },
                            { name: "Forest" },
                            { name: "Mountain" }
                        ]
                    }
                },
                {
                    name: "player2",
                    deck: {
                         cards: [
                            { name: "Wastes" },
                            { name: "Wastes" },
                            { name: "Wastes" },
                            { name: "Wastes" },
                            { name: "Wastes" }
                        ]
                    }
                }
            ];
            var game = new Game(players);
            game.libraries[0].cards.should.have.members(players[0].deck.cards);
            game.libraries[1].cards.should.have.members(players[1].deck.cards);
        });
    });
});