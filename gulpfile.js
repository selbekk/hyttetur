var gulp = require('gulp'),
    wiredep = require('wiredep'),
    server = require('gulp-server-livereload'),
    changed = require('gulp-changed'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    minifyCss = require('gulp-minify-css'),
    cssPrefixed = require('gulp-autoprefixer')
    del = require('del');

// Clean build
gulp.task('clean', function(cb) {
    console.log('deleting src/assets');
	del(['src/assets'], cb);
});


// CSS build
gulp.task('style', function () {
    console.log('compiling styles');
	return gulp.src('src/css/**.css')
		.pipe(plumber())
		.pipe(cssPrefixed({browsers: ['last 2 versions'], cascade: false}))
		.pipe(minifyCss())
		.pipe(concat('styles.min.css'))
		.pipe(gulp.dest('src/assets/'));
 });

// Bower stuff
gulp.task('bower:wire', function() {
    console.log('wiring in any new bower dependencies');
	wiredep({src: './src/*.html', dest: './src/*.html'});
});

gulp.task('bower:copy', function () {
    console.log('copying any new bower components');
    gulp.src('bower_components/**')
        .pipe(changed('src/bower_components'))
        .pipe(gulp.dest('src/bower_components'));
});

// Watch for changes
gulp.task('watch', function() {
    console.log('watching for changes...')
    gulp.watch('src/css/**', ['clean', 'style']);
    gulp.watch('bower.json', ['bower']);
});

// Web server
gulp.task('serve', function() {
	gulp.src('src')
		.pipe(server({
			liveReload: false,
			open: true
		}));
});

// Combos
gulp.task('bower', ['bower:wire', 'bower:copy']);
gulp.task('default', ['bower', 'clean', 'style', 'serve', 'watch']);
