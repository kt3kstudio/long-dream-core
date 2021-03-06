const { renderEmoji } = require('../../util/emoji')
const { Body, animation, ratio, margin } = require('spn')

const { on, component } = capsid

const CSS_CLASS_GOAL_EMOJI = 'emoji-round-yellow'

/**
 * The goal panel on the top right corner.
 */
@margin({ x: 6, y: 6 })
@animation.show('bom-appear', 400)
@animation.hide('bom-disapper', 400)
@ratio.x(0)
@ratio.y(0)
@component
class GoalPanel extends Body {

  /**
   * Sets the goals as text.
   * @param {string} goals The goals in text
   */
  setGoals (goals) {
    this.goals = goals
    this.elem.data('goals-text', goals)
    this.elem.cc('goal-detection')
  }

  /**
   * The handler for the goal detection.
   * @param {object} e The event
   * @param {number} index The index of goaled cell
   */
  @on('goal-detection.goal')
  onGoalDetection (e, index) {
    const target = this.elem.find('.emoji')[index]

    $(target).addClass(CSS_CLASS_GOAL_EMOJI)
  }

  /**
   * Returns true iff all the goals have been achieved.
   * @return {boolean}
   */
  isFull () {
    return this.elem.cc.get('goal-detection').remaining() === 0
  }

  /**
   * Shows the goals.
   */
  showGoals () {
    this.elem.html(renderEmoji(this.goals))
  }

  willShow () {
    this.showGoals()

    this.updateElem()
  }

  willHide () {
    this.elem.css('opacity', 0)
  }
}

module.exports = GoalPanel
