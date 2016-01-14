/// <binding BeforeBuild='compile' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp')
    debug = require("gulp-debug")
    rimraf = require("gulp-rimraf");

var paths = {
    target: { base: 'app/dist/' },
    source: { base: 'app/src/' }
};

paths.source.images = paths.source.base + 'img/';
paths.target.images = paths.target.base + 'img/';

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('compile', ['default'], function () {
    
});

gulp.task('images', ['images:clean'], function () {
    return gulp.src([paths.source.images + '*.png', paths.source.images + '*.jpg'])
        .pipe(debug())
        .pipe(gulp.dest(paths.target.images));
});

gulp.task('images:clean', function () {
    return gulp.src(paths.target.images + '*.*', { read: false })
        .pipe(rimraf());

});

gulp.task('full-build', ['compile', 'images']);