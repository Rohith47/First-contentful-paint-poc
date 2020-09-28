var gulp = require('gulp'),
  svgSprite = require('gulp-svg-sprite'),
  config = {
    mode: {
      css: { // Activate the «css» mode
        render: {
          css: true // Activate CSS output (with default options)
        },
        bust: false
      }
    }
  };
  function defaultTask(cb) {
   
    gulp.src('./public/images/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./public/out'));
    cb();
  }
  
  exports.default = defaultTask;