import Rect from '../../../src/domain/common/Rect'

describe('Rect', function () {

    var rect

    beforeEach(function () {

        rect = new Rect({
            top: 100,
            right: 500,
            bottom: 600,
            left: 300
        })

    })

    describe('width', function () {

        it('returns the width of the rect', function () {

            expect(rect.width()).to.equal(200)

        })

    })

    describe('height', function () {

        it('returns the height of the rect', function () {

            expect(rect.height()).to.equal(500)

        })

    })

    describe('subrect', function () {

        it('gets the fragment of the partition of the rect', function () {

            var subrect = rect.subrect({
                partition: [2, 5],
                get: [0, 2]
            })

            expect(subrect.top).to.equal(300)
            expect(subrect.right).to.equal(400)
            expect(subrect.bottom).to.equal(400)
            expect(subrect.left).to.equal(300)

        })

    })

    describe('toGrid', () => {

        it('returns a grid which has origin at the center of the rect', () => {

            const grid = rect.toGrid()

            expect(grid.x).to.equal(rect.centerX())
            expect(grid.y).to.equal(rect.centerY())

        })

        it('returns a grid which has unit width and height as the width and rect of the rect', () => {

            const grid = rect.toGrid()

            expect(grid.unitWidth).to.equal(rect.width())
            expect(grid.unitHeight).to.equal(rect.height())

        })

    })

})
