var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('default', function () {
       gulp.src(['./js/polyfill.js', './js/utility.js', './js/legend.js', 'sweet_pie.js'])
        .pipe(concat('sweet_pie.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/'))
});
