

const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const del = require('del');
const config = require('../config').svgSprite;
const plumber = require('gulp-plumber');
const handleErrors = require('../util/handleErrors');


const spriteTemplate = config.type === 'symbol' ? config.templateSymbol : config.templateCss;

const spriteOptions = {
  mode: {
    [config.type]: {
      layout: 'horizontal',
      sprite: config.spriteImgName,
      dest: '.',
      render: {
        scss: {
          template: spriteTemplate,
          dest: config.sassDest,
        },
      },
    },
  },
  variables: config.templateVars,
};

// Clean
gulp.task('sprite:clean', function(cb) {
  del([config.dest + '/images/sprite*.svg'], { dot: true }).then(paths => {
    cb();
  });
});

gulp.task('sprite', ['sprite:clean'], function(cb) {
  return gulp.src(config.glob, { cwd: config.src })
    .pipe(plumber())
    .pipe(svgSprite(spriteOptions))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
});
