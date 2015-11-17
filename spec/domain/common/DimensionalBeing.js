



describe('DimensionalBeing', function () {
    'use strict';

    var elem = null;
    var dim = null;

    beforeEach(function () {

        elem = $('<div />');

        dim = new domain.common.DimensionalBeing(elem);

        dim.x = 30;
        dim.y = 40;
        dim.dimension.width = 10;
        dim.dimension.height = 20;

    });

    describe('willShow', function () {

        it('sets up the element dimensions', function () {

            dim.willShow();

            expect(dim.elem.width()).to.equal(10);
            expect(dim.elem.height()).to.equal(20);
            expect(dim.elem.css('left')).to.equal('30px');
            expect(dim.elem.css('top')).to.equal('40px');

        });

        it('sets the elem position as absolute', function () {

            dim.willShow();
            expect(dim.elem.css('position')).to.equal('absolute');

        });

        it('sets the transition-timing-function of the element to linear', function () {

            dim.willShow();
            expect(dim.elem.css('transition-timing-function')).to.equal('linear');

        });

    });

    describe('rightLimit', function () {

        it('returns the right limit x position', function () {

            expect(dim.rightLimit()).to.equal(40);

        });

    });

    describe('leftLimit', function () {

        it('returns the left limit x position', function () {

            expect(dim.leftLimit()).to.equal(30);

        });

    });

    describe('topLimit', function () {

        it('returns the top limit y position', function () {

            expect(dim.topLimit()).to.equal(40);

        });

    });

    describe('bottomLimit', function () {

        it('returns the bottom limit y position', function () {

            expect(dim.bottomLimit()).to.equal(60);

        });

    });

    describe('moveToX', function () {

        it('it moves the sprite offset to specified x', function () {

            dim.moveToX(50);

            expect(dim.x).to.equal(50);
            expect(dim.y).to.equal(40);
            expect(dim.elem.css('left')).to.equal('50px');
            expect(dim.elem.css('top')).to.equal('40px');

        });

    });

    describe('moveToY', function () {

        it('it moves the sprite offset to specified x', function () {

            dim.moveToY(50);

            expect(dim.x).to.equal(30);
            expect(dim.y).to.equal(50);
            expect(dim.elem.css('left')).to.equal('30px');
            expect(dim.elem.css('top')).to.equal('50px');

        });

    });

});
