var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var chaiAsPromised = require("chai-as-promised");
chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);
var Player = require('../lib/player');
var Game = require("../lib/game");

describe("player", function() {
    describe("initialDraw", function() {
        it("draws 7 cards into players hand", function() {
            var player1 = new Player({
                cards: [{
                    name: "Wastes",
                    cardnumber: 101,
                    set: "OGW"
                }, {
                    name: "Wastes",
                    cardnumber: 101,
                    set: "OGW"
                }, {
                    name: "Wastes",
                    cardnumber: 101,
                    set: "OGW"
                }, {
                    name: "Wastes",
                    cardnumber: 101,
                    set: "OGW"
                }, {
                    name: "Wastes",
                    cardnumber: 101,
                    set: "OGW"
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
            });
            var game = new Game([player1]);
            //game sets up library and emits event calling initialDraw    

            player1.hand.length.should.equal(7);
        });
    });
});