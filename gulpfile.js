'use strict';

const gulp    = require('gulp');
const eslint  = require('gulp-eslint');
const webpack = require('webpack-stream');
const del     = require('del');


const PATHS = {
  all:          [__dirname + '/frontend/app/**/*'],
  js:           [__dirname + '/frontend/app/**/*.js'],
  webpackEntry: [__dirname + '/frontend/entry.js', __dirname + '/webpack.config.js'], 
  html:         [__dirname + '/frontend/app/main/index.html', __dirname + '/frontend/app/**/*.html'],
  css:          [__dirname + '/frontend/app/**/*.css', __dirname + '/node_modules/bootstrap/dist/css/bootstrap.min.css'],
  build:        __dirname + '/frontend/build/'
};

////////////////////////////////////////////////
// BUILD TASKS
////////////////////////////////////////////////

gulp.task('eslint', () => {
  return gulp.src(PATHS.js)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('build:clear', () => {
  return del(PATHS.build + '*');
});

gulp.task('build:html', () => {
  return gulp.src(PATHS.html)
    .pipe(gulp.dest(PATHS.build));
});

gulp.task('build:css', () => {
  return gulp.src(PATHS.css)
    .pipe(gulp.dest(PATHS.build));
});

gulp.task('build:js', () => {
  return (gulp.src(PATHS.webpackEntry[0]))
    .pipe(webpack(require(PATHS.webpackEntry[1])))
    .pipe(gulp.dest(PATHS.build));
});

gulp.task('build:all', ['eslint', 'build:clear', 'build:html', 'build:css', 'build:js'], () => {
  console.log('-------REBUILT-------');
});

gulp.task('build:watch', () => {
  gulp.watch(PATHS.all, ['build:all']);
});
