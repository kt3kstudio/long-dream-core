const ScreenplayLine = require('./screenplay-line')
const { parse } = require('scenarioscript')

const { on, component } = capsid

const variables = {}

/**
 * The manager class of screenplay.
 */
@component('screenplay')
class Screenplay {

  __init__ () {
    this.context = this.$el.data('context')

    const text = this.$el.text()

    this.lines = parse(text).map(line => new ScreenplayLine(line.role, line.message, this.context, line.params))
  }

  /**
   * Replaces @word@ style variables in the text.
   * @param {string} text The text
   * @param {object} vars The variables
   */
  static replaceVars (text, vars) {
    Object.keys(vars).forEach(key => {
      const value = vars[key]

      text = text.replace(`@${key}@`, value)
    })

    return text
  }

  /**
   * @param {object} vars The variables
   */
  static addVars (vars) {
    Object.keys(vars).forEach(key => {
      const value = vars[key]

      variables[key] = value
    })
  }

  /**
   * Returns true iff all the actors are ready.
   * @return {boolean}
   */
  actorsReady () {
    return this.lines.filter(line => !line.actorIsReady()).length === 0
  }

  /**
   * Plays the screenplay.
   * @param {object} [vars] The template variables
   * @return {Promise}
   */
  @on('screenplay-start')
  play ({vars} = {}) {
    vars = Object.assign({}, variables, vars)

    return this.lines.reduce((p, line) => p.then(() => line.play({vars})), Promise.resolve())
  }
}

module.exports = Screenplay
