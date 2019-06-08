var gulp        = require("gulp");
var sass        = require("gulp-sass");
var cssnano     = require("gulp-cssnano");
var uglify      = require("gulp-uglify");
var rename      = require("gulp-rename");
var autoprefixer= require("gulp-autoprefixer");
var source      = require("vinyl-source-stream");
var buffer      = require("vinyl-buffer");
var browserify  = require("browserify");
var vueify      = require("vueify");

var ROOTPATH = "/";
var PREFIX_PATH = {
  src: 'src',
  dist: 'dist'
};
var PATH = {
  sass   : {
    entry: PREFIX_PATH.src + "/scss/index.scss",
    src:   PREFIX_PATH.src + "/scss/**/*.scss",
    dist:  PREFIX_PATH.dist + "/assets/css"
  },
  js     : {
    entry: PREFIX_PATH.src + "/js/index.js",
    src:   PREFIX_PATH.src + "/js/**/*.{vue,js}",
    dist:  PREFIX_PATH.dist + "/assets/js"
  },
  static: {
    src: [PREFIX_PATH.src + "/**/*.{ttf,woff,woff2,eot,svg}",
          PREFIX_PATH.src + "/manifest.json",
          PREFIX_PATH.src + "/js/background.js",
          PREFIX_PATH.src + "/views/index.html"],
    dist: PREFIX_PATH.dist
  },
  images: {
    src: PREFIX_PATH.src + "/img/**/*.{png,jpg}",
    dist: PREFIX_PATH.dist + "/assets/img"
  }
};

// Static server + watching asset files
gulp.task('serve', ['sass', 'browserify', 'static', 'images'], function() {
    gulp.watch(PATH.sass.src, ['sass']);
    gulp.watch(PATH.js.src, ['browserify']);
    gulp.watch(PATH.static.src, ['static']);
    gulp.watch(PATH.static.images, ['images']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src(PATH.sass.src)
    .pipe(sass({
      includePaths: ['node_modules/ayu-css/src',
                     'node_modules/gridle/sass',
                     'node_modules/Ionicons/scss']
    }))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(gulp.dest(PATH.sass.dist));
});

// Compile all js files into one file
gulp.task('browserify', function() {
  return browserify(PATH.js.entry)
    .transform(vueify)
    .bundle()
    .pipe(source('app.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(PATH.js.dist));
});

// Move all static files to dist
gulp.task('static', function() {
  return gulp.src(PATH.static.src)
    .pipe(gulp.dest(PATH.static.dist));
});

// Move all static files to dist
gulp.task('images', function() {
  return gulp.src(PATH.images.src)
    .pipe(gulp.dest(PATH.images.dist));
});
// Export assets to other directory
// accept three argument:
// path = main directory target's path (required),
// sass = sass folder (optional),
// js = js folder (optional)
gulp.task('export-assets', function(done) {
  var sassPath = argv.sass ? argv.sass : '/assets/sass';
  var jsPath = argv.js ? argv.js : '/assets/js';

  if (argv.path === undefined) {
    console.log(chalk.red('Please provide path parameter by using --path flag'));
  } else {
    console.log('Target path: ' + chalk.cyan(argv.path));
    gulp.src(PATH.sass.src)
      .pipe(gulp.dest(argv.path + sassPath))
      .on('end', function() { console.log('Copying sass files: ' + chalk.cyan('Done')); });
    gulp.src(PATH.js.src)
      .pipe(gulp.dest(argv.path + jsPath))
      .on('end', function() { console.log('Copying js files: ' + chalk.cyan('Done')); });
  }

  return done();
});

// Main task
gulp.task('default', ['serve']);
