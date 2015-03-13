var gulp = require('gulp'),
    wiredep = require('wiredep'),
    server = require('gulp-server-livereload'), 
    changed = require('gulp-changed');

gulp.task('bower', ['bower:wire', 'bower:copy']);

gulp.task('bower:wire', function() {
	wiredep({src: './src/*.html', dest: './src/*.html'});
});

gulp.task('bower:copy', function () {
    gulp.src('bower_components/**')
        .pipe(changed('src/bower_components'))
        .pipe(gulp.dest('src/bower_components'));
});

gulp.task('serve', function() {
	gulp.src('src')
		.pipe(server({
			liveReload: false,
			open: true
		}));
});

gulp.task('default', ['bower', 'serve']);
