
var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat')
    uglify = require('gulp-uglify')
    prefix = require('gulp-autoprefixer')
    sass = require('gulp-sass');

// // Minifies JS
// gulp.task('js', function(){
//     return gulp.src('src/js/*.js')
//     .pipe(uglify())
//     .pipe(gulp.dest('public/js'))
// });

gulp.task('styles', function(){
    return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(prefix('last 2 versions'))
    .pipe(concat('style.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('public/css'))
});



gulp.task('default', function() {
    gulp.start('styles')
    gulp.watch('src/sass/**/*.sass', ['styles'])
});
