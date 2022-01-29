const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const del = require("del");
const htmlmin = require('gulp-htmlmin');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const twig = require("gulp-twig");
const { dest, lastRun, parallel, series, src, watch: gulpWatch } = require("gulp");

const twigBase = "src/pages";
const cssPath = "src/styles/styles.css";

const config = {
  cssSrc: cssPath,
  distPath: "dist/",
  viewSrc: `${twigBase}/**/[^_]*.twig`,
  staticSrc: [
    "src/**/*",
    "!" + cssPath,
    "!" + `${twigBase}{/**/*,}`,
  ],
};

function clean() {
  return del(config.distPath);
}

function styles() {
  return src(config.cssSrc)
    .pipe(postcss([
      tailwindcss(),
      autoprefixer(),
    ]))
    .pipe(dest(config.distPath))
}

function reload(done) {
  browserSync.reload();
  done();
}

function serve(done) {
  browserSync.init({
    server: { baseDir: "./dist" }
  });

  done();
}

function static() {
  return src(config.staticSrc, { since: lastRun(static) })
    .pipe(dest(config.distPath));
}

function views() {
  return src(config.viewSrc)
    .pipe(twig({
      extname: '',
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyCSS: true,
      minifyJS: true, 
    }))
    .pipe(dest(config.distPath));
}

function watch(done) {
  gulpWatch(config.viewSrc, series(parallel(styles, views), reload));
  gulpWatch(config.staticSrc, series(static, reload));
  gulpWatch(config.cssSrc, series(styles, reload));
  
  done();
}

/**
 * Simple exports
 */

exports.clean = clean;
exports.styles = styles;
exports.views = views;

/**
 * Compound exports
 */

function build(done) {
  series(clean, parallel(styles, static, views));
  done();
}

exports.build = build;
exports.dev = series(build, serve, watch);
