


describe('Scoreboard', function () {
    'use strict';

    var elem, scoreboard;

    beforeEach(function () {

        elem = $('<div />');

        scoreboard = elem.cc.init('scoreboard');

    });

    it('sets the initial score 0', function () {

        expect(scoreboard.getScore()).to.equal(0);

    });

    describe('setDimension', function () {

        it('sets the dimension', function () {

            scoreboard.setDimension({
                left: 0,
                top: 0,
                width: 100,
                height: 200
            });

            expect(scoreboard.x).to.exist;
            expect(scoreboard.y).to.exist;
            expect(scoreboard.w).to.exist;
            expect(scoreboard.h).to.exist;
            expect(scoreboard.marginLeft).to.exist;
            expect(scoreboard.marginTop).to.exist;

        });

    });

    describe('show', function () {

        it('shows the element', function () {

            return scoreboard.show();

        });

    });

    describe('addScore', function () {

        it('adds the score', function () {

            scoreboard.addScore(10);

            expect(scoreboard.getScore()).to.equal(10);

            scoreboard.addScore(1000);

            expect(scoreboard.getScore()).to.equal(1010);
            expect(scoreboard.elem.text()).to.equal('1,010');

            scoreboard.addScore(20000);

            expect(scoreboard.getScore()).to.equal(21010);
            expect(scoreboard.elem.text()).to.equal('21,010');

        });

    });

    describe('getScore', function () {

        it('gets the score', function () {

            expect(scoreboard.getScore()).to.equal(0);

        });

    });

});
