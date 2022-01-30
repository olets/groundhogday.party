const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const del = require("del");
const htmlmin = require('gulp-htmlmin');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const twig = require("gulp-twig");
const { dest, lastRun, parallel, series, src, watch: gulpWatch } = require("gulp");

const distFolder = "dist"
const stylesSrcGlobs = "src/styles/styles.css";

const config = {
  cleanGlobs: [`${distFolder}/**/*`, `!${distFolder}/.gitkeep`],
  stylesSrcGlobs: stylesSrcGlobs,
  stylesWatchGlobs: [stylesSrcGlobs, "tailwind.config.js"],
  viewsGlobs: "src/views/**/[^_]*.twig",
  staticGlobs: "src/static/**/*",
};

function clean() {
  return del(config.cleanGlobs);
}

function reload(done) {
  browserSync.reload();
  done();
}

function serve(done) {
  browserSync.init({
    server: { baseDir: distFolder }
  });

  done();
}

function static() {
  return src(config.staticGlobs, { since: lastRun(static) })
    .pipe(dest(distFolder));
}

function styles() {
  return src(config.stylesSrcGlobs)
    .pipe(postcss([
      tailwindcss(),
      autoprefixer(),
    ]))
    .pipe(dest(distFolder))
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
    .pipe(dest(distFolder));
}

function watch(done) {
  gulpWatch(config.viewsGlobs, series(parallel(styles, views), reload));
  gulpWatch(config.staticGlobs, series(static, reload));
  gulpWatch(config.stylesWatchGlobs, series(styles, reload));
  
  done();
}

/**
 * Single-task exports
 */

exports.clean = clean;

/**
 * Multi-task exports
 */

const build = parallel(styles, static, views);

exports.build = build;
exports.dev = series(build, serve, watch);
