const {Body, animation} = require('spn')
const block = require('../../ui/block')
const {small, br, span} = require('dom-gen')

const {component} = capsid

@component
@block
@animation.show('bom-appear', 400)
@animation.hide('bom-disappear', 400)
class LevelSignboard extends Body {
  __init__ () {
    this.level = this.$el.text()
    this.$el.empty()
  }

  /**
   * Sets the contents.
   * @param {object[]} args The contents
   */
  setLabel (...args) {
    this.elem.empty()
    this.elem.append(...args)
  }

  /**
   * Sets the text label for the entering scene.
   */
  setEntering () {
    this.setLabel(small('Entering'), br(), span(`Level ${this.level}`))
  }

  /**
   * Sets the text label for the entering scene.
   */
  setLeaving () {
    this.setLabel(small('Leaving'), br(), span(`Level ${this.level}`))
  }

  /**
   * Defines the block's rect by the given guiding rect.
   * @param {Rect} guidingRect
   * @return {Rect}
   */
  block (guidingRect) {
    return guidingRect.scaleLeft(8 / 9).scaleRight(7 / 8).scaleTop(2 / 3).scaleBottom(1 / 2)
  }

  show () {
    this.setRect(this.getRect())

    return super.show()
  }

  didShow () {
    this.elem.css('opacity', 1)
  }

  willHide () {
    this.elem.css('opacity', 0)
  }
}

module.exports = LevelSignboard
