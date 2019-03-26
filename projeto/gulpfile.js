var gulp = require('gulp'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch'),
	jshint = require('gulp-jshint'),
	jslint = require('gulp-jslint'),
	stylish = require('jshint-stylish'),
	stylus = require('gulp-stylus'),
	babel = babel = require('gulp-babel'),
	server = require('gulp-server-livereload');

gulp.task('scripts', function() {
	return gulp
		.src(['app/assets/_js/**/*.js'])
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('app/assets/javascript'));
});

gulp.task('stylus', function() {
	return gulp.src('app/assets/stylus/*.styl')
		.pipe(stylus({
			compress: true
		}))
		.pipe(gulp.dest('app/assets/css/'));
});

gulp.task('jshint', function() {
	return gulp.src(['app/assets/_js/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task('webserver', function() {
	gulp.src('app')
		.pipe(server({
			livereload: true,
			directoryListing: false,
			open: true,
			defaultFile: 'index.html'
		}));
});

gulp.task('watch', function() {
	gulp.watch('app/assets/_js/**/*.js', ['jshint']);
	gulp.watch('app/assets/_js/**/*.js', ['scripts']);
	gulp.watch('app/assets/stylus/*.styl', ['stylus']);
});

gulp.task('default', ['webserver', 'watch']);