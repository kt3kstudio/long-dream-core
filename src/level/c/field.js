const {Animation, Body} = require('spn')

const {component} = capsid

/**
 * Field class represents the background field graphics.
 *
 * This class doesn't handle the mechanism above the field, which is the responsibility of FieldCells and BallMoveMobLeaveService classes.
 */
@component('field-grid')
class Field extends Body {

  showAnim () { return new Animation('field-appear', 200) }

  hideAnim () { return new Animation('field-disappear', 400) }

  /**
   * @param {Rect} rect The rect to fit into
   */
  setRect (rect) {
    super.setRect(rect)

    this.posture.marginX = -5
    this.posture.marginY = -5
  }
}

module.exports = Field
