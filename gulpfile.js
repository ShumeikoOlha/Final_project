"use strict";

const gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    prefix = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    rimraf = require('rimraf'),
    browserSync = require('browser-sync').create();

var path = {
    dev: 'app/',
    production: 'build/'
};


/*********************************
 Developer tasks
 *********************************/

//pug compile
gulp.task('pug', ['clean'], function () {
    return gulp.src([path.dev + '*.pug', '!' + path.dev + 'template.pug'])
        .pipe(plumber())
        .pipe(pug())
        .pipe(gulp.dest(path.production))
        .pipe(browserSync.stream())
});

//sass compile
gulp.task('sass', ['clean'], function () {
    return gulp.src(path.dev + '*.sass')
        .pipe(plumber())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(prefix({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(path.production + 'css/'))
        .pipe(browserSync.stream());
});
gulp.task('sass_vendor', ['clean'], function () {
    return gulp.src(path.dev + '_assets/css/*.css')
        .pipe(plumber())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(prefix({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(path.production + 'css/'))
        .pipe(browserSync.stream());
});
//js compile
gulp.task('scripts', ['clean'], function () {
    return gulp.src([
        path.dev + '**/*.js',
        '!' + path.dev + '_assets/**/*.js'
    ])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.production + 'js/'))
        .pipe(browserSync.stream());
});

gulp.task('vendor_scripts', ['clean'], function () {
    return gulp.src(path.dev + '_assets/js/*.js')
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.production + 'js/'))
        .pipe(browserSync.stream());
});


//clean
gulp.task('clean', function (cb) {
    rimraf(path.production, cb);
});

//copy images to production
gulp.task('img', ['clean'], function () {
    return gulp.src(path.dev + 'img/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest(path.production + 'img/'));
});

//copy fonts to production
gulp.task('fonts', ['clean'], function () {
    return gulp.src(path.dev + '/fonts/**/*.*')
        .pipe(gulp.dest(path.production + 'fonts/'));
});
// Sprite TODO
// gulp.task('sprite', function(cb) {
//   const spriteData = gulp.src(path.production + 'img/icons/*.png').pipe(spritesmith({
//     imgName: 'sprite.png',
//     imgPath: '../img/sprite.png',
//     cssName: 'sprite.scss'
//   }));
//
//   spriteData.img.pipe(gulp.dest(path.production + 'img/'));
//   spriteData.css.pipe(gulp.dest(path.production + 'css/global/'));
//   cb();
// });

//default
gulp.task('scripts1', function () {
    return gulp.src([
        path.dev + '**/*.js',
        '!' + path.dev + '_assets/**/*.js'
    ])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.production + 'js/'))
        .pipe(browserSync.stream());
});
gulp.task('pug1', function () {
    return gulp.src([path.dev + '*.pug', '!' + path.dev + 'template.pug'])
        .pipe(plumber())
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(path.production))
        .pipe(browserSync.stream())
});

//sass compile
gulp.task('sass1', function () {
    return gulp.src(path.dev + '*.sass')
        .pipe(plumber())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(prefix({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(path.production + 'css/'))
        .pipe(browserSync.stream());
});

//watch
gulp.task('watch', ['clean'], function () {
    gulp.watch(path.dev + '**/*.pug', ['pug1']);
    gulp.watch(path.dev + '**/*.sass', ['sass1']);
    gulp.watch(path.dev + '**/*.js', ['scripts1']);
});

//server
gulp.task('browser-sync', ['clean'], function () {
    browserSync.init({
        port: 3000,
        server: {
            baseDir: path.production
        }
    });
});
gulp.task('default', ['watch', 'pug', 'sass', 'sass_vendor', 'scripts', 'vendor_scripts', 'fonts', 'img', 'browser-sync']);

