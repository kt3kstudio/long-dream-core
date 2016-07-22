require('../../../src/ui/screenplay/screenplay')

const {expect} = require('chai')
const domGen = require('dom-gen')

const {component} = $.cc

const script = domGen('script')

describe('screenplay', () => {
  let elem, sm

  before(() => {
    class TestSpeaker {
      constructor (elem) {
        elem.data('speaker', this)
      }

      speak (line) {
        this.elem.attr('stored-message', line)
      }
    }

    component('test-speaker')(TestSpeaker)
  })

  beforeEach(() => {
    elem = script `
      [#moo0] Hey!
      [#moo1] Hi!
      [#moo2] Yay!
    `.attr('type', 'text/x-screenplay')

    sm = elem.cc.init('screenplay')

    $('<div id="moo0" />').appendTo(document.body).cc.init('test-speaker')
    $('<div id="moo1" />').appendTo(document.body).cc.init('test-speaker')
    $('<div id="moo2" />').appendTo(document.body).cc.init('test-speaker')
  })

  afterEach(() => {
    $('.test-speaker').remove()
  })

  it('stores the parsed screenplay-lines', () => {
    expect(sm.lines.length).to.equal(3)
    expect(sm.lines[0].selector).to.equal('#moo0')
    expect(sm.lines[0].line).to.equal('Hey!')
    expect(sm.lines[1].selector).to.equal('#moo1')
    expect(sm.lines[1].line).to.equal('Hi!')
    expect(sm.lines[2].selector).to.equal('#moo2')
    expect(sm.lines[2].line).to.equal('Yay!')
  })

  describe('actorsReady', () => {
    it('returns true when all the actors are ready', () => {
      expect(sm.actorsReady()).to.be.true
    })
  })

  describe('start', () => {
    it('starts the screenplay', done => {
      sm.play().then(() => {
        expect($('#moo0').attr('stored-message')).to.equal('Hey!')
        expect($('#moo1').attr('stored-message')).to.equal('Hi!')
        expect($('#moo2').attr('stored-message')).to.equal('Yay!')
        done()
      }).catch(done)
    })
  })
})
