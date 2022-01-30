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
  stylesGlobs: `${stylesRoot}/styles.css`,
  distFolder: "dist/",
  viewsGlobs: `${viewsRoot}/**/[^_]*.twig`,
  staticGlobs: [
    "src/**/*",
    `!${stylesRoot}{,/**/*}`,
    `!${viewsRoot}{,/**/*}`,
  ],
};

function clean() {
  return del(config.distFolder);
}

function styles() {
  return src(config.stylesGlobs)
    .pipe(postcss([
      tailwindcss(),
      autoprefixer(),
    ]))
    .pipe(dest(config.distFolder))
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
  return src(config.staticGlobs, { since: lastRun(static) })
    .pipe(dest(config.distFolder));
}

function views() {
  return src(config.viewsGlobs)
    .pipe(twig({ extname: '' }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyCSS: true,
      minifyJS: true, 
    }))
    .pipe(dest(config.distFolder));
}

function watch(done) {
  gulpWatch(config.viewsGlobs, series(parallel(styles, views), reload));
  gulpWatch(config.staticGlobs, series(static, reload));
  gulpWatch(config.stylesGlobs, series(styles, reload));
  
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

const build = series(clean, parallel(styles, static, views));

exports.build = build;
exports.dev = series(build, serve, watch);
