const path = require("path");
const del = require("del");
const twing = require("gulp-twing");
const { dest, parallel, series, src } = require("gulp");
const { TwingEnvironment, TwingLoaderRelativeFilesystem } = require("twing");

const env = new TwingEnvironment(new TwingLoaderRelativeFilesystem());

const twigBase = path.join(__dirname, "/src/pages");

const config = {
  distPath: path.join(__dirname, "./dist/"),
  twigSrc: `${twigBase}/**/[^_]*.twig`,
  staticSrc: [path.join(__dirname, "./src/**/*"), `!${twigBase}`, `!${twigBase}/**/*`],
};

function clean() {
  return del(config.distPath);
}

function static() {
  return src(config.staticSrc).pipe(dest(config.distPath));
}

function twig() {
  return src(config.twigSrc)
    .pipe(twing(env, {}, { outputExt: "" }))
    .pipe(dest(config.distPath));
}

exports.clean = clean;
exports.build = series(clean, parallel(static, twig));
