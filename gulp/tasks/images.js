var gulp     = require('gulp');
var cache    = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var util     = require('gulp-util');
var config   = require('../config.js');


gulp.task('images', function(){
  return gulp
    .src([
      config.src.img + '**/*.{jpg,png,jpeg,svg,gif}'
    ])
    .pipe(config.production ? imagemin({interlaced: true}) : util.noop())
    // .pipe(cache(imagemin({
    //     interlaced: true
    //   })))
    .pipe(gulp.dest(config.dest.root))
});

gulp.task('images:watch', function() {
  gulp.watch(config.src.img + '**/*.{jpg,png,jpeg,svg,gif}', ['images']);
});
