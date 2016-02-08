/// <binding BeforeBuild='compile' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
    debug = require("gulp-debug"),
    rimraf = require("gulp-rimraf"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    less = require("gulp-less");

var paths = {
    target: { base: 'app/dist/' },
    source: { base: 'app/src/', node_modules : 'node_modules/' }
};

paths.source.images = paths.source.base + 'img/';
paths.target.images = paths.target.base + 'img/';
paths.source.scriptsMin = paths.source.base + 'js/**/*.min.js';
paths.source.scripts = [paths.source.base + 'js/**/*.js', '!' + paths.source.scriptsMin];
paths.target.scripts = paths.target.base + 'js/';
paths.target.html = paths.target.base + '';
paths.source.html = paths.source.base + 'views/';
paths.target.css = paths.target.base + 'css/';
paths.source.css = paths.source.base + 'styles/';

gulp.task('scripts', ['scripts:clean','scripts:min'], function () {
    return gulp.src(paths.source.scriptsMin)
        .pipe(debug())
        .pipe(gulp.dest(paths.target.scripts));
});

gulp.task('scripts:clean', function () {
    return gulp.src([paths.target.scripts + '*.*', paths.source.scriptsMin])
        .pipe(rimraf());
});

gulp.task('scripts:min', ['scripts:clean'], function () {
    return gulp.src(paths.source.scripts)
        .pipe(debug())
        .pipe(uglify())
        .pipe(debug())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(paths.source.base + 'js'));
});

gulp.task('compile', ['scripts','html','styles'], function () {
    
});

gulp.task('html', function () {
    return gulp.src(paths.source.html + '*.html')
        .pipe(debug())
        .pipe(gulp.dest(paths.target.html));
});

gulp.task('styles', ['styles:less'], function () {
    return gulp.src(paths.source.css + '*.css')
        .pipe(gulp.dest(paths.target.css));
});

gulp.task('styles:less', function () {
    return gulp.src(paths.source.css + '*.less')
        .pipe(debug())
        .pipe(less())
        .pipe(rename({ extname: '.css' }))
        .pipe(debug())
        .pipe(gulp.dest(paths.source.css));
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

gulp.task('libraries', ['angular', 'bootstrap']);
gulp.task('bootstrap', ['jquery','bootstrap:clean'], function () {
    gulp.src(['Scripts/bootstrap.min.js'])
        .pipe(gulp.dest(paths.target.scripts + 'bootstrap/'));

    return gulp.src(['Content/bootstrap.min.css'])
        .pipe(gulp.dest(paths.target.css + 'bootstrap/'))
});
gulp.task('bootstrap:clean', function () {
    return gulp.src([paths.target.css + 'bootstrap/*.*', paths.target.scripts + 'bootstrap/*.*'])
        .pipe(rimraf());
});
gulp.task('jquery', function () {
    gulp.src(['Scripts/jquery-*.min.js'])
        .pipe(gulp.dest(paths.target.scripts + 'jquery/'));
});
gulp.task('angular', ['angular:clean'], function () {
    return gulp.src([paths.source.node_modules + 'angular/angular.js', paths.source.node_modules + 'angular-route/angular-route.js'])
        .pipe(debug())
        .pipe(gulp.dest(paths.target.scripts + 'angular/'))
});
gulp.task('angular:clean', function () {
    return gulp.src(paths.target.scripts + 'angular/*.*')
        .pipe(rimraf());
});
gulp.task('full-build', ['compile', 'images', 'libraries']);


//File watchers
gulp.task('watch', function () {
    gulp.watch(paths.source.scripts, ['scripts']);
    gulp.watch(paths.source.css + '*.less', ['styles']);
    gulp.watch(paths.source.html + '*.html', ['html']);
})