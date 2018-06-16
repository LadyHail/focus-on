var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    return gulp.src('src/styles/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/styles/css'));
});

gulp.task('default', function () {
    gulp.watch('src/styles/scss/*.scss', ['sass']);
});