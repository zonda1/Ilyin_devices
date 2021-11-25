const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const htmlmin = require("gulp-htmlmin");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const del = require("del");
const reporter = require("postcss-reporter");
const stylelint = require("stylelint");
const svgstore = require("gulp-svgstore");
const cheerio = require("gulp-cheerio");
const Imask = require("imask");
const browserify = require('gulp-browserify');
const concat = require('gulp-concat');

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Images

const optimizeImages = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}

exports.optimizeImages = optimizeImages;

const copyImages = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(gulp.dest("build/img"))
}

exports.copyImages = copyImages;

// WebP

const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest("build/img"))
}

exports.createWebp = createWebp;


// Copy

const copy = (done) => {
  gulp.src([
      "source/fonts/*.{woff2,woff}",
      "source/img/**/*.svg",
      "source/js/*.js",
      "source/*.html"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

// Clean

const clean = () => {
  return del("build");
};

exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Sprite

const sprite = () => {
  return gulp.src("source/img/icons/sprite-icons/*.svg")
    .pipe(cheerio({
      run: ($) => {
        $('[fill]').removeAttr('fill');
      },
      parserOptions: {
        xmlMode: false
      }
    }))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/icons/sprite-icons"));
}

exports.sprite = sprite;

// Reload

const reload = (done) => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  styles, server, watcher
);


gulp.task('libs', function () {
  return gulp.src(['node_modules/imask/dist/imask.js'])
    .pipe(gulp.dest('source/js'))
});

// gulp.task('js', function () {
//   return gulp.src('source/js/**/*.js')

//     .pipe(concat('main.js'))
//     .pipe(gulp.dest('build/js'))
// });


// Build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    sprite,
    createWebp,
    'libs',
  ),
);

exports.build = build;

// Default

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    sprite,
    createWebp,
    'libs',
  ),
  gulp.series(
    server,
    watcher
  ));


gulp.task('hello', function (callback) {
  console.log('Hello!');
  callback();
});
