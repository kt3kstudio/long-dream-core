const Sprite = require('./sprite')
const Ma = require('./ma')
const {wait, Image, DirStateImageMap, DIRS} = require('spn')
const {traits} = require('traits-decorator')

const CHR_TABLE = {
  ma: Ma
}

/**
 * CharSprite class handles 4-directional character sprite.
 *
 * Trant.
 */
@traits(Sprite)
class CharSprite {

  /**
   * Returns the default direction.
   */
  defaultDir () { return DIRS.DOWN }

  /**
   * Returns the default state.
   */
  defaultState () { return 'default' }

  /**
   * Initializes the sprite.
   * @param {jQuery} elem The jquery dom element
   */
  initSprite (elem) {
    this.character = elem.data('character')

    CHR_TABLE[this.character.id].call(this)

    this.dirStateImage = new DirStateImageMap()

    this.dirStateImage.addImageByDirState(new Image(this.upImage()), DIRS.UP, 'default')
    this.dirStateImage.addImageByDirState(new Image(this.downImage()), DIRS.DOWN, 'default')
    this.dirStateImage.addImageByDirState(new Image(this.leftImage()), DIRS.LEFT, 'default')
    this.dirStateImage.addImageByDirState(new Image(this.rightImage()), DIRS.RIGHT, 'default')
  }

  /**
   * Changes the direction the character currently heading for.
   * @param {DIRS} dir The direction (one of up, down, left or right)
   */
  turn (dir) {
    this.setDir(dir)
  }

  /**
   * Gets the direction to the target point.
   * @deprecated
   * @param {string} coordinate 'x' or 'y'
   * @param {number} to The position
   */
  getDirection (coordinate, to) {
    if (coordinate === 'x') {
      return to > this.x ? DIRS.RIGHT : DIRS.LEFT
    }

    return to > this.y ? DIRS.DOWN : DIRS.UP
  }

  /**
   * Moves the sprite to the given position within the given duration.
   * @deprecated
   * @param {string} coordinate 'x' or 'y'
   * @param {number} to The position to go
   * @param {number} dur The duration of movement in ms
   */
  moveTo (coordinate, to, dur) {
    const dir = this.getDirection(coordinate, to)

    this.turn(dir)

    this.setTransitionDuration(dur)

    if (dir === DIRS.UP || dir === DIRS.DOWN) {
      this.moveToY(to)
    } else {
      this.moveToX(to)
    }

    return wait(dur)
  }
}

module.exports = CharSprite
