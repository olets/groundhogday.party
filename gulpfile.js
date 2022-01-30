const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const del = require("del");
const htmlmin = require('gulp-htmlmin');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const twig = require("gulp-twig");
const { dest, lastRun, parallel, series, src, watch: gulpWatch } = require("gulp");

const viewsRoot = "src/views";
const stylesRoot = "src/styles";

const config = {
  stylesSrc: `${stylesRoot}/styles.css`,
  distPath: "dist/",
  viewsSrc: `${viewsRoot}/**/[^_]*.twig`,
  staticSrc: [
    "src/**/*",
    `!${stylesRoot}{,/**/*}`,
    `!${viewsRoot}{,/**/*}`,
  ],
};

function clean() {
  return del(config.distPath);
}

function styles() {
  return src(config.stylesSrc)
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
  return src(config.viewsSrc)
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
  gulpWatch(config.viewsSrc, series(parallel(styles, views), reload));
  gulpWatch(config.staticSrc, series(static, reload));
  gulpWatch(config.stylesSrc, series(styles, reload));
  
  done();
}

/**
 * Single-task exports
 */

exports.clean = clean;
exports.styles = styles;
exports.views = views;

/**
 * Multi-task exports
 */

function build(done) {
  series(clean, parallel(styles, static, views));
  done();
}

exports.build = build;
exports.dev = series(build, serve, watch);
