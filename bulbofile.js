const bulbo = require('bulbo')
const asset = bulbo.asset

const bundler = require('bundle-through')
const frontMatter = require('gulp-front-matter')
const layout1 = require('layout1')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const path = require('path')

const config = {lang: 'en'}
const presets = require('./src/debug/ls-switch/presets')
const basepath = process.env.BASEPATH || ''
const SITE = 'site'
const SRC = 'src'

const IS_DEV = process.env.NODE_ENV !== 'production'

const templateData = {config, basepath, IS_DEV, presets}

const paths = {
  js: {
    entry: `${SRC}/*/index.js`,
    all: `${SRC}/**/*.js`
  },
  scss: {
    src: `${SRC}/*/index.scss`
  },
  html: {
    page: `${SRC}/*/index.html`
  },
  layout: {
    default: `${SRC}/common/layout.njk`
  },
  vendor: `${SRC}/vendor/**/*.*`,
  data: `${SRC}/data/**/*.*`,
  img: `${SRC}/**/*.{svg,png}`
}

// js
asset(paths.js.entry)
  .assetOptions({ read: false })
  .watch(paths.js.entry, paths.js.all)
  .pipe(bundler({ transform: 'babelify' }))

// html
asset(paths.html.page)
  .watch(paths.html.page, paths.layout.default)
  .pipe(frontMatter())
  .pipe(rename(p => {
    p.basename = path.basename(p.dirname)
    p.dirname = path.dirname(p.dirname)
  }))
  .pipe(layout1.nunjucks(paths.layout.default, { data: templateData }))

// css
asset(paths.scss.src).pipe(sass())

// data
asset(paths.data)

// images
asset(paths.img)

// vendor things
asset(paths.vendor)

bulbo.base(SRC)
bulbo.debugPagePath('__pairs__')
