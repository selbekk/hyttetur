var gulp = require('gulp'),
    wiredep = require('wiredep'),
    server = require('gulp-server-livereload');

gulp.task('bower', function() {
	wiredep({src: './src/*.html', dest: './src/*.html'});
});

gulp.task('serve', function() {
	gulp.src('src')
		.pipe(server({
			liveReload: false,
			open: true
		}));
});
