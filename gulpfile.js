/*
Gulpfile.js file for the tutorial:
Using Gulp, SASS and Browser-Sync for your front end web development - DESIGNfromWITHIN
http://designfromwithin.com/blog/gulp-sass-browser-sync-front-end-dev

Steps:

1. Install gulp globally:
npm install --global gulp

2. Type the following after navigating in your project folder:
npm install gulp gulp-util gulp-stylus gulp-uglify gulp-rename gulp-minify-css gulp-notify gulp-concat gulp-plumber browser-sync --save-dev

3. Move this file in your project folder

4. Setup your vhosts or just use static server (see 'Prepare Browser-sync for localhost' below)

5. Type 'Gulp' and start developing
*/

/* Needed gulp config */
var gulp = require('gulp')
var stylus = require('gulp-stylus')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var notify = require('gulp-notify')
var eslint = require('gulp-eslint')
var cmq = require('gulp-merge-media-queries')
var cssnano = require('gulp-cssnano')
var jeet = require('jeet')
var rupture = require('rupture')
var csso = require('gulp-csso')
var concat = require('gulp-concat')
var plumber = require('gulp-plumber')
var browserSync = require('browser-sync')
var reload = browserSync.reload

var supportedBrowsers = [
  'last 2 versions',
  'safari >= 8',
  'ie >= 10',
  'ff >= 20',
  'ios 6',
  'android 4'
]

/* Scripts task */
gulp.task('scripts', function () {
  return gulp.src([
    /* Add your JS files here, they will be combined in this order */
    'src/js/vendor/jquery-1.11.1.js',
    'src/js/core.js'
  ])
  .pipe(eslint())
  .pipe(concat('main.js'))
  .pipe(gulp.dest('js'))
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('assets/js'))
})

/* stylus task */
gulp.task('stylus', function () {
  gulp.src('src/stylus/core.styl')
  .pipe(plumber())
  .pipe(stylus({
    'include css': true,
    use: [jeet(), rupture()]
  }))
  .pipe(concat('core.min.css'))
  .pipe(cmq())
  .pipe(csso())
  .pipe(
    cssnano({
      autoprefixer: {browsers: supportedBrowsers, add: true}
    })
  )
  .pipe(gulp.dest('css'))
  .pipe(gulp.dest('assets/css'))
  /* Reload the browser CSS after every change */
  .pipe(reload({stream: true}))
})

/* Reload task */
gulp.task('bs-reload', function () {
  browserSync.reload()
})

/* Prepare Browser-sync for localhost */
gulp.task('browser-sync', function () {
  browserSync.init(['assets/css/*.css', 'assets/js/*.js'], {
    server: {
      baseDir: './'
    },
    port: 3000
  })
})

/* Watch stylus, js and html files, doing different things with each. */
gulp.task('default', ['stylus', 'browser-sync'], function () {
  /* Watch styl, run the sass task on change. */
  gulp.watch(['src/stylus/*.styl', 'stylus/**/*.styl'], ['stylus'])
  /* Watch app.js file, run the scripts task on change. */
  gulp.watch(['src/js/app.js'], ['scripts'])
  /* Watch .html files, run the bs-reload task on change. */
  gulp.watch(['*.html'], ['bs-reload'])
})
