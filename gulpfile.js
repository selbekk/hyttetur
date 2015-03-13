var gulp = require('gulp'),
    wiredep = require('wiredep');

gulp.task('bower', function() {
	wiredep({src: './src/*.html', dest: './src/*.html'});
});
