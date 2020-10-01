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

  var gulpif = require('gulp-if');
  var sprity = require('sprity');

  function defaultTask(cb) {
    gulp.src('./public/images/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./public/out'));
    cb();
  }

  function pngsprite(cb) {
    sprity.src({
      src: './src/images/**/*.{png,jpg}',
      style: './sprite.css',
      // ... other optional options
      // for example if you want to generate scss instead of css
      processor: 'sass', // make sure you have installed sprity-sass
    })
    .pipe(gulpif('*.png', gulp.dest('./dist/img/'), gulp.dest('./dist/css/')))
  }
  
  exports.default = defaultTask;
  exports.pngsprite = pngsprite;