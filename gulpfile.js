var gulp = require('gulp');
var gls = require('gulp-live-server');
var sass = require('gulp-sass');

gulp.task('style', function(){
  gulp.src('_scss/main.scss')
    .pipe(sass({errLogToConsole: true}))
    .pipe(gulp.dest('.'));
});

gulp.task('default', function(){
  var server = gls.static('.');
  server.start();

  gulp.watch(['*.html', '_layouts/*.html', 'style.css'], server.notify);

  gulp.watch('scss/main.scss', ['style']);
});