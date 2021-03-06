var gulp = require('gulp'),
    wiredep = require('wiredep'),
    server = require('gulp-server-livereload'),
    changed = require('gulp-changed'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    minifyCss = require('gulp-minify-css'),
    cssPrefixed = require('gulp-autoprefixer')
    del = require('del'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    require('gulp-release-tasks')(gulp);

// Clean build
gulp.task('clean', function(cb) {
    console.log('deleting src/assets');
	del(['src/assets/**'], cb);
});

// JS build
gulp.task('script', function() {
    console.log('compiling javascripts')
    return gulp.src('src/js/**.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('src/assets/'));

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
gulp.task('bower', function() {
    console.log('wiring in any new bower dependencies');
	wiredep({src: './src/*.html', dest: './src/*.html'});
});

// Watch for changes
gulp.task('watch', function() {
    console.log('watching for changes...')
    gulp.watch('src/css/**', ['build']);
    gulp.watch('bower.json', ['bower']);
    gulp.watch('src/js/**', ['build']);
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
gulp.task('build', ['clean', 'style', 'script']);
gulp.task('default', ['bower', 'clean', 'style', 'serve', 'watch']);
