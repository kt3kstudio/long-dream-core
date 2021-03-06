const { sprite } = require('../../ui')
const { GridWalker, DIRS, ratio } = require('spn')

const { component } = capsid

/**
 * The main character on the level scene.
 */
@sprite.character
@component('hero')
@ratio.x(0.5)
@ratio.y(1)
class Character extends GridWalker {

  /**
   * @override
   */
  willShow () {
    this.updateSprite()

    return super.willShow()
  }

  didShow () {
    this.elem.css('opacity', 1)
  }

  /**
   * @override
   */
  willHide () {
    this.elem.css('opacity', 0)
  }

  /**
   * Moves a unit upward along the grid.
   *
   * @return {Promise}
   */
  moveUpOnGrid () {
    this.turn(DIRS.UP)

    return super.moveUpOnGrid()
  }

  /**
   * Moves a unit upward along the grid.
   *
   * @return {Promise}
   */
  moveRightOnGrid () {
    this.turn(DIRS.RIGHT)

    return super.moveRightOnGrid()
  }

  /**
   * Moves a unit upward along the grid.
   *
   * @return {Promise}
   */
  moveDownOnGrid () {
    this.turn(DIRS.DOWN)

    return super.moveDownOnGrid()
  }

  /**
   * Moves a unit upward along the grid.
   *
   * @return {Promise}
   */
  moveLeftOnGrid () {
    this.turn(DIRS.LEFT)

    return super.moveLeftOnGrid()
  }
}

module.exports = Character
