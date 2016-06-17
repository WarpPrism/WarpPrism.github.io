var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');

gulp.task('style', function() {
    return gulp.src('css/*.css')
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(cleancss({compatibility: 'ie8'}))
        .pipe(gulp.dest('build/css/'));
});

gulp.task('script', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('image', function() {
    return gulp.src('imgs/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/imgs'));
});

// Default task
gulp.task('default', function() {
    gulp.start('style','script', 'image', 'watch');
});

// Watch
gulp.task('watch', function () {
    // Watch .scss files
    gulp.watch('css/*.css', ['style']);
    // Watch .js files
    gulp.watch('js/*.js', ['script']);
    // Watch image files
    gulp.watch('imgs/*', ['image']);
});
