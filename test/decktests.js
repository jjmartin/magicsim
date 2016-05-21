var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var chaiAsPromised = require("chai-as-promised"),
    Deck = require('../lib/deck');
var should = chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);


var rnd = function() {
    return 0.25;
}; // de-randomizing



describe('shuffle', function() {
    var cards;
    beforeEach(function() {
        cards = [{
            name: "Island"
        }, {
            name: "Plains"
        }, {
            name: "Swamp"
        }, {
            name: "Forest"
        }, {
            name: "Mountain"
        }];
    });

    it('draw() works', function() {
        var deck = new Deck(cards, rnd);
        var card = deck.draw();
        should.not.exist(card.length);
        card.name.should.equal('Plains');
        deck.length.should.equal(4);
    });

    it('draw(2) works', function() {
        var deck = new Deck(cards, rnd);
        var hand = deck.draw(2);
        should.exist(hand.length);
        hand.length.should.equal(2);
        hand[0].name.should.equal('Plains');
        hand[1].name.should.equal('Mountain');
        deck.length.should.equal(3);
    });

    it('draw 1 more than deck has, errors', function() {
        var deck = new Deck(cards, rnd);
        deck.draw(5);
        var cardOverdraw = deck.draw.bind(deck, 1);
        cardOverdraw.should.throw('Tried to draw more cards than left in deck');
    });
    
    it('draw more than deck has, errors', function() {
        var deck = new Deck(cards, rnd);
        var cardOverdraw = deck.draw.bind(deck, 6);
        cardOverdraw.should.throw('Tried to draw more cards than left in deck');
    });

    it('drawRandom() works', function() {
        var deck = new Deck(cards, rnd);
        var card = deck.drawRandom();
        should.not.exist(card.length);
        card.name.should.equal('Swamp');
        deck.length.should.equal(4);
    });

    it('drawRandom(2) works', function() {
        var deck = new Deck(cards, rnd);
        var hand = deck.drawRandom(2);
        should.exist(hand.length);
        hand.length.should.equal(2);
        hand[0].name.should.equal('Swamp');
        hand[1].name.should.equal('Island');
        deck.length.should.equal(3);
    });

    it('reset works', function() {
        var deck = new Deck(cards, rnd);
        var card = deck.draw();
        card.name.should.equal('Plains');
        deck.length.should.equal(4);

        deck.reset();
        card = deck.draw();
        card.name.should.equal('Mountain');
        deck.length.should.equal(4);
    });

    it('issue #3', function() {
        var deck = new Deck(cards, rnd);
        deck.length.should.equal(5);
        var card = deck.drawFromBottomOfDeck(1);
        deck.length.should.equal(4);
    });
});