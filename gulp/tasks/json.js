var gulp 			= require('gulp');
var config 			= require('../config');
var babel 			= require('gulp-babel');
var notify 			= require('gulp-notify');
var mode        	= require('gulp-mode')();
var uglify 			= require('gulp-uglify');
var browserSync 	= require('browser-sync');
var include 		= require('gulp-include');
var sourcemaps 		= require('gulp-sourcemaps');

gulp.task('copy-json', function() {
    return gulp.src(config.src.json + '/*.json')
    .pipe(gulp.dest(config.dest.json));
});

gulp.task('watch-json', function() {
    gulp.watch(config.src.json + '/*.json', gulp.series('copy-json'));
});