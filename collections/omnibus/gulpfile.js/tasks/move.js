

const gulp = require('gulp');
const config = require('../config').move;

gulp.task('move', function(cb) {
  if (config.length <= 0) {
    return cb();
  }

  config.forEach(function(entry) {
    gulp.src(entry.src)
      .pipe(gulp.dest(entry.dest));
  });

  return cb();
});
