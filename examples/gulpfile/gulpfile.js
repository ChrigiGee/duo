/**
 * Module Dependencies
 */

var map = require('map-stream');
var Duo = require('../../');
var gulp = require('gulp');
var util = require('../../lib/util');
var token = util.token();

/**
 * Default
 */

gulp.task('default', ['scripts', 'styles']);

/**
 * Scripts
 */

gulp.task('scripts', function() {
  gulp.src('home.js')
    .pipe(duo())
    .pipe(gulp.dest('build'))
})

/**
 * Styles
 */

gulp.task('styles', function() {
  gulp.src('home.css')
    .pipe(duo())
    .pipe(gulp.dest('build'))
})

/**
 * Duo
 */

function duo(opts) {
  opts = opts || {};

  return map(function(file, fn) {
    Duo(file.base)
      .token(token)
      .entry(file.path)
      .run(function(err, results) {
        if (err) return fn(err);
        file.contents = new Buffer(results.code);
        fn(null, file);
      });
  });
}
