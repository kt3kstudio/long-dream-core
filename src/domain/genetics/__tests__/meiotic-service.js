const MeioticService = require('../meiotic-service')

describe('MeioticService', () => {
  'use strict'

  const meiosis = new MeioticService()

  describe('recombination', () => {
    it('returns recombined gene from mother and mother', () => {
      expect(meiosis.recombination('f', 'f')).to.equal('f')
      expect(meiosis.recombination('f', 'm')).to.equal('fm')
      expect(meiosis.recombination('f', 'fm')).to.equal('fm')
      expect(meiosis.recombination('f', 'mf')).to.equal('fmf')
      expect(meiosis.recombination('f', 'fmf')).to.equal('fmf')
      expect(meiosis.recombination('f', 'mfm')).to.equal('fmfm')
      expect(meiosis.recombination('f', 'fmfm')).to.equal('fmfm')
      expect(meiosis.recombination('f', 'mfmf')).to.equal('fmfmf')
      expect(meiosis.recombination('f', 'fmfmf')).to.equal('fmfmf')
      expect(meiosis.recombination('f', 'mfmfm')).to.equal('fmfmfm')
      expect(meiosis.recombination('f', 'fmfmfm')).to.equal('fmfmfm')
      expect(meiosis.recombination('f', 'mfmfmf')).to.equal('fmfmfmf')
      expect(meiosis.recombination('f', 'fmfmfmf')).to.equal('fmfmfmf')
      expect(meiosis.recombination('f', 'mfmfmfm')).to.equal('a')
      expect(meiosis.recombination('f', 'a')).to.equal('fa')
      expect(meiosis.recombination('f', 'aa')).to.equal('faa')
      expect(meiosis.recombination('f', 'w')).to.equal('fw')
      expect(meiosis.recombination('f', 'ww')).to.equal('fww')
      expect(meiosis.recombination('f', 'b')).to.equal('fb')
      expect(meiosis.recombination('f', 'bb')).to.equal('fbb')

      expect(meiosis.recombination('m', 'f')).to.equal('mf')
      expect(meiosis.recombination('m', 'm')).to.equal('m')
      expect(meiosis.recombination('m', 'fm')).to.equal('mfm')
      expect(meiosis.recombination('m', 'mf')).to.equal('mf')
      expect(meiosis.recombination('m', 'fmf')).to.equal('mfmf')
      expect(meiosis.recombination('m', 'mfm')).to.equal('mfm')
      expect(meiosis.recombination('m', 'fmfm')).to.equal('mfmfm')
      expect(meiosis.recombination('m', 'mfmf')).to.equal('mfmf')
      expect(meiosis.recombination('m', 'fmfmf')).to.equal('mfmfmf')
      expect(meiosis.recombination('m', 'mfmfm')).to.equal('mfmfm')
      expect(meiosis.recombination('m', 'fmfmfm')).to.equal('mfmfmfm')
      expect(meiosis.recombination('m', 'mfmfmf')).to.equal('mfmfmf')
      expect(meiosis.recombination('m', 'fmfmfmf')).to.equal('a')
      expect(meiosis.recombination('m', 'mfmfmfm')).to.equal('mfmfmfm')
      expect(meiosis.recombination('m', 'a')).to.equal('ma')
      expect(meiosis.recombination('m', 'aa')).to.equal('maa')
      expect(meiosis.recombination('m', 'w')).to.equal('mw')
      expect(meiosis.recombination('m', 'ww')).to.equal('mww')
      expect(meiosis.recombination('m', 'b')).to.equal('mb')
      expect(meiosis.recombination('m', 'bb')).to.equal('mbb')

      expect(meiosis.recombination('fm', 'f')).to.equal('fmf')
      expect(meiosis.recombination('fm', 'm')).to.equal('fm')
      expect(meiosis.recombination('fm', 'fm')).to.equal('fmfm')
      expect(meiosis.recombination('fm', 'mf')).to.equal('fmf')
      expect(meiosis.recombination('fm', 'fmf')).to.equal('fmfmf')
      expect(meiosis.recombination('fm', 'mfm')).to.equal('fmfm')
      expect(meiosis.recombination('fm', 'fmfm')).to.equal('fmfmfm')
      expect(meiosis.recombination('fm', 'mfmf')).to.equal('fmfmf')
      expect(meiosis.recombination('fm', 'fmfmf')).to.equal('fmfmfmf')
      expect(meiosis.recombination('fm', 'mfmfm')).to.equal('fmfmfm')
      expect(meiosis.recombination('fm', 'fmfmfm')).to.equal('a')
      expect(meiosis.recombination('fm', 'mfmfmf')).to.equal('fmfmfmf')
      expect(meiosis.recombination('fm', 'fmfmfmf')).to.equal('a')
      expect(meiosis.recombination('fm', 'mfmfmfm')).to.equal('a')
      expect(meiosis.recombination('fm', 'a')).to.equal('fma')
      expect(meiosis.recombination('fm', 'aa')).to.equal('fmaa')
      expect(meiosis.recombination('fm', 'w')).to.equal('fmw')
      expect(meiosis.recombination('fm', 'ww')).to.equal('fmww')
      expect(meiosis.recombination('fm', 'b')).to.equal('fmb')
      expect(meiosis.recombination('fm', 'bb')).to.equal('fmbb')

      expect(meiosis.recombination('mf', 'f')).to.equal('mf')
      expect(meiosis.recombination('mf', 'm')).to.equal('mfm')
      expect(meiosis.recombination('mf', 'fm')).to.equal('mfm')
      expect(meiosis.recombination('mf', 'mf')).to.equal('mfmf')
      expect(meiosis.recombination('mf', 'fmf')).to.equal('mfmf')
      expect(meiosis.recombination('mf', 'mfm')).to.equal('mfmfm')
      expect(meiosis.recombination('mf', 'fmfm')).to.equal('mfmfm')
      expect(meiosis.recombination('mf', 'mfmf')).to.equal('mfmfmf')
      expect(meiosis.recombination('mf', 'fmfmf')).to.equal('mfmfmf')
      expect(meiosis.recombination('mf', 'mfmfm')).to.equal('mfmfmfm')
      expect(meiosis.recombination('mf', 'fmfmfm')).to.equal('mfmfmfm')
      expect(meiosis.recombination('mf', 'mfmfmf')).to.equal('a')
      expect(meiosis.recombination('mf', 'fmfmfmf')).to.equal('a')
      expect(meiosis.recombination('mf', 'mfmfmfm')).to.equal('a')
      expect(meiosis.recombination('mf', 'a')).to.equal('mfa')
      expect(meiosis.recombination('mf', 'aa')).to.equal('mfaa')
      expect(meiosis.recombination('mf', 'w')).to.equal('mfw')
      expect(meiosis.recombination('mf', 'ww')).to.equal('mfww')
      expect(meiosis.recombination('mf', 'b')).to.equal('mfb')
      expect(meiosis.recombination('mf', 'bb')).to.equal('mfbb')

      expect(meiosis.recombination('fmf', 'f')).to.equal('fmf')
      expect(meiosis.recombination('fmf', 'm')).to.equal('fmfm')
      expect(meiosis.recombination('fmf', 'fm')).to.equal('fmfm')
      expect(meiosis.recombination('fmf', 'mf')).to.equal('fmfmf')
      expect(meiosis.recombination('fmf', 'fmf')).to.equal('fmfmf')
      expect(meiosis.recombination('fmf', 'mfm')).to.equal('fmfmfm')
      expect(meiosis.recombination('fmf', 'fmfm')).to.equal('fmfmfm')
      expect(meiosis.recombination('fmf', 'mfmf')).to.equal('fmfmfmf')
      expect(meiosis.recombination('fmf', 'fmfmf')).to.equal('fmfmfmf')
      expect(meiosis.recombination('fmf', 'mfmfm')).to.equal('a')
      expect(meiosis.recombination('fmf', 'fmfmfm')).to.equal('a')
      expect(meiosis.recombination('fmf', 'mfmfmf')).to.equal('a')
      expect(meiosis.recombination('fmf', 'fmfmfmf')).to.equal('a')
      expect(meiosis.recombination('fmf', 'mfmfmfm')).to.equal('a')
      expect(meiosis.recombination('fmf', 'a')).to.equal('fmfa')
      expect(meiosis.recombination('fmf', 'aa')).to.equal('fmfaa')
      expect(meiosis.recombination('fmf', 'w')).to.equal('fmfw')
      expect(meiosis.recombination('fmf', 'ww')).to.equal('fmfww')
      expect(meiosis.recombination('fmf', 'b')).to.equal('fmfb')
      expect(meiosis.recombination('fmf', 'bb')).to.equal('fmfbb')

      expect(meiosis.recombination('mfm', 'f')).to.equal('mfmf')
      expect(meiosis.recombination('mfm', 'm')).to.equal('mfm')
      expect(meiosis.recombination('mfm', 'fm')).to.equal('mfmfm')
      expect(meiosis.recombination('mfm', 'mf')).to.equal('mfmf')
      expect(meiosis.recombination('mfm', 'fmf')).to.equal('mfmfmf')
      expect(meiosis.recombination('mfm', 'mfm')).to.equal('mfmfm')
      expect(meiosis.recombination('mfm', 'fmfm')).to.equal('mfmfmfm')
      expect(meiosis.recombination('mfm', 'mfmf')).to.equal('mfmfmf')
      expect(meiosis.recombination('mfm', 'fmfmf')).to.equal('a')
      expect(meiosis.recombination('mfm', 'mfmfm')).to.equal('mfmfmfm')
      expect(meiosis.recombination('mfm', 'fmfmfm')).to.equal('a')
      expect(meiosis.recombination('mfm', 'mfmfmf')).to.equal('a')
      expect(meiosis.recombination('mfm', 'fmfmfmf')).to.equal('a')
      expect(meiosis.recombination('mfm', 'mfmfmfm')).to.equal('a')
      expect(meiosis.recombination('mfm', 'a')).to.equal('mfma')
      expect(meiosis.recombination('mfm', 'aa')).to.equal('mfmaa')
      expect(meiosis.recombination('mfm', 'w')).to.equal('mfmw')
      expect(meiosis.recombination('mfm', 'ww')).to.equal('mfmww')
      expect(meiosis.recombination('mfm', 'b')).to.equal('mfmb')
      expect(meiosis.recombination('mfm', 'bb')).to.equal('mfmbb')

      expect(meiosis.recombination('a', 'f')).to.equal('af')
      expect(meiosis.recombination('a', 'm')).to.equal('am')
      expect(meiosis.recombination('a', 'fm')).to.equal('afm')
      expect(meiosis.recombination('a', 'mf')).to.equal('amf')
      expect(meiosis.recombination('a', 'fmf')).to.equal('afmf')
      expect(meiosis.recombination('a', 'mfm')).to.equal('amfm')
      expect(meiosis.recombination('a', 'fmfm')).to.equal('afmfm')
      expect(meiosis.recombination('a', 'mfmf')).to.equal('amfmf')
      expect(meiosis.recombination('a', 'fmfmf')).to.equal('afmfmf')
      expect(meiosis.recombination('a', 'mfmfm')).to.equal('amfmfm')
      expect(meiosis.recombination('a', 'fmfmfm')).to.equal('afmfmfm')
      expect(meiosis.recombination('a', 'mfmfmf')).to.equal('amfmfmf')
      expect(meiosis.recombination('a', 'fmfmfmf')).to.equal('aa')
      expect(meiosis.recombination('a', 'mfmfmfm')).to.equal('aa')
      expect(meiosis.recombination('a', 'a')).to.equal('aa')
      expect(meiosis.recombination('a', 'aa')).to.equal('aaa')
      expect(meiosis.recombination('a', 'w')).to.equal('aw')
      expect(meiosis.recombination('a', 'ww')).to.equal('aww')
      expect(meiosis.recombination('a', 'b')).to.equal('ab')
      expect(meiosis.recombination('a', 'bb')).to.equal('abb')

      expect(meiosis.recombination('aaaa', 'aaaa')).to.equal('w')

      expect(meiosis.recombination('wwww', 'wwww')).to.equal('b')

      expect(meiosis.recombination('bbbb', 'bbbb')).to.equal('m')
    })
  })

  describe('virtualLength', () => {
    it('returns the virtual length of each gene', () => {
      expect(meiosis.virtualLength('m')).to.equal(1)
      expect(meiosis.virtualLength('f')).to.equal(1)
      expect(meiosis.virtualLength('a')).to.equal(8)
      expect(meiosis.virtualLength('w')).to.equal(64)
      expect(meiosis.virtualLength('b')).to.equal(512)

      expect(meiosis.virtualLength('mf')).to.equal(2)
      expect(meiosis.virtualLength('ma')).to.equal(9)
      expect(meiosis.virtualLength('mw')).to.equal(65)
      expect(meiosis.virtualLength('mb')).to.equal(513)

      expect(meiosis.virtualLength('fm')).to.equal(2)
      expect(meiosis.virtualLength('fa')).to.equal(9)
      expect(meiosis.virtualLength('fw')).to.equal(65)
      expect(meiosis.virtualLength('fb')).to.equal(513)

      expect(meiosis.virtualLength('am')).to.equal(9)
      expect(meiosis.virtualLength('af')).to.equal(9)
      expect(meiosis.virtualLength('aa')).to.equal(16)
      expect(meiosis.virtualLength('aw')).to.equal(72)
      expect(meiosis.virtualLength('ab')).to.equal(520)

      expect(meiosis.virtualLength('wm')).to.equal(65)
      expect(meiosis.virtualLength('wf')).to.equal(65)
      expect(meiosis.virtualLength('wa')).to.equal(72)
      expect(meiosis.virtualLength('ww')).to.equal(128)
      expect(meiosis.virtualLength('wb')).to.equal(576)

      expect(meiosis.virtualLength('bm')).to.equal(513)
      expect(meiosis.virtualLength('bf')).to.equal(513)
      expect(meiosis.virtualLength('ba')).to.equal(520)
      expect(meiosis.virtualLength('bw')).to.equal(576)
      expect(meiosis.virtualLength('bb')).to.equal(1024)

      expect(meiosis.virtualLength('fmawb')).to.equal(586)
      expect(meiosis.virtualLength('bwafm')).to.equal(586)
    })
  })
})
