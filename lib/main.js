var Game = require("./game");
var Player = require("./player");

var players = [
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

var game = new Game(players);

game.start(); 