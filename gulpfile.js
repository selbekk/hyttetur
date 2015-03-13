var gulp = require('gulp'),
    wiredep = require('wiredep'),
    server = require('gulp-server-livereload'),
    changed = require('gulp-changed'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    minifyCss = requie('gulp-minify-css'),
    del = require('del');
 
// Clean build
gulp.task('clean', function(cb) {
	del(['src/assets'], cb);
});


// CSS build
gulp.task('style', function () {
	return gulp.src('src/css/**.css')
		.pipe(plumber())
		.pipe(cssPrefixed({browsers: ['last 2 versions'], cascade: false}))
		.pipe(minifyCss())
		.pipe(concat('styles.min.css'))
		.pipe(gulp.dest('src/assets/'));
 });

// Bower stuff
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

// Combos
gulp.task('bower', ['bower:wire', 'bower:copy']);
gulp.task('default', ['bower', 'clean', 'style', 'serve']);
