describe('DimensionFactory', function () {
  'use strict'

  var factory

  before(function () {
    factory = new domain.level.DimensionFactory()
  })

  describe('topUIPosition', function () {
    it('returns the dimension for the top UIs', function () {
      var dimension = factory.topUIPosition()

      expect(dimension).to.be.instanceof(domain.level.Dimension)
    })
  })

  describe('fieldPosition', function () {
    it('returns the dimension for the field', function () {
      var dimension = factory.fieldPosition()

      expect(dimension).to.be.instanceof(domain.level.Dimension)
    })
  })

  describe('evalRoomPosition', function () {
    it('returns the dimension for the evaluation place', function () {
      var dimension = factory.evalRoomPosition()

      expect(dimension).to.be.instanceof(domain.level.Dimension)
    })
  })

  describe('queuePosition', function () {
    it('returns the dimension for the queue', function () {
      var dimension = factory.queuePosition()

      expect(dimension).to.be.instanceof(domain.level.Dimension)
    })
  })

  describe('fusionBoxPosition', function () {
    it('returns the dimension for the fusion place', function () {
      var dimension = factory.fusionBoxPosition()

      expect(dimension).to.be.instanceof(domain.level.Dimension)
    })
  })

  describe('paperPosition', function () {
    it('returns the dimension for the paper', function () {
      var dimension = factory.paperPosition()

      expect(dimension).to.be.instanceof(domain.level.Dimension)
    })
  })

  describe('resultPanePosition', function () {
    it('returns the dimension for the result pane', function () {
      var dimension = factory.resultPanePosition()

      expect(dimension).to.be.instanceof(domain.level.Dimension)
    })
  })

  describe('scoreboardDimension', function () {
    it('returns the dimension for the scoreboard', function () {
      var dimension = factory.scoreboardDimension()

      expect(dimension).to.be.instanceof(domain.level.Dimension)
    })
  })
})
