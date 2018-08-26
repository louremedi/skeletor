/* gulpfile.js -- Builds the assets for the style guide.
 *
*/

'use strict';

/*
|--------------------------------------------------------------------------
| DEPENDENCIES
|--------------------------------------------------------------------------
*/
var gulp         = require('gulp');

// Twig
var twig         = require('gulp-twig');

// Style
var sass         = require('gulp-sass');
var cleanCSS     = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');

// Script
var uglify              = require('gulp-uglify');
var resolveDependencies = require('gulp-resolve-dependencies');
var concat              = require('gulp-concat');

// Images
//var imagemin = require('gulp-imagemin');

// Snif erreur
var plumber = require('gulp-plumber');

// Merge : Permet de faire plusieurs src en une task
var merge = require('merge-stream');

/*
|--------------------------------------------------------------------------
| CONFIGURATION
|--------------------------------------------------------------------------
*/

var ROOT = './';
var target = {
  dev: '',
  build: '__public/'
}

/*
|--------------------------------------------------------------------------
| TASK GROUPS
|--------------------------------------------------------------------------
*/
gulp.task('default', ['dev']);

gulp.task('dev',     ['build', 'watch']);
gulp.task('build',   ['twig', 'style', 'script-app', 'script-plugin', 'asset', 'print']);
gulp.task('watch',   ['build']);

/*
|--------------------------------------------------------------------------
| TWIG - Template
| IMPORTANT : Le twig doit être appelé en 1er
| IMPORTANT : Le *.html sert à prendre que les .html à la racine
|--------------------------------------------------------------------------
*/
gulp.task('twig', function() {
    return gulp.src(ROOT+'twig/template/*.html')
        .pipe(twig())
        .pipe(gulp.dest(target.build));
});

/*
|--------------------------------------------------------------------------
| STYLEHEET GENERATION AND OPTIMIZATION
|--------------------------------------------------------------------------
*/
gulp.task('style', function () {
    // Dossier(s)/fichier(s) d'entrée
    return gulp.src(ROOT+'style/style.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({browsers: ['last 20 versions']}))
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    // .pipe(cleanCSS({ debug: true }, function(details) {
    //   console.log(details.name + ' (before) >>> ' + details.stats.originalSize);
    //   console.log(details.name + ' (after)  >>> ' + details.stats.minifiedSize);
    // }))
    .pipe(sourcemaps.write('.'))
    //.pipe(gulp.dest(target.dev+'style'))
    .pipe(gulp.dest(target.build+'style'));
});

//
// On bluid les fichiers JS qui sont dans core, sauf app.js, dans un fichier core.js
//
// * jquery-open + jquery-close : Fix le bug jQuery dans Drupal
// * jquery-open.js ouvre jQuery
// * jquery-close.js ouvre jQuery
//
// * Le fichier app.js init le fichier généré core.js
//
gulp.task('script-app', function () {
    return gulp.src([
        //
        // OPEN
        ROOT+'script/app/jquery-open.js',
        //
        // Appeler tous les autres scripts ici
        ROOT+'script/app/scroll-top.js',
        ROOT+'script/app/cover.js',
        
        //
        // init des scripts du dessus
        ROOT+'script/app/_app.js',

        //
        // Close
        ROOT+'script/app/jquery-close.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(resolveDependencies({
        pattern: /\* @requires [\s-]*(.*?\.js)/g
    }))
    .pipe(concat('app.js'))
    //.pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(target.build+'script'));
});

//
// On build les JS qui sont dans plugin dans un fichier vendor.js
//
gulp.task('script-plugin', function () {
    return gulp.src([

        //
        // OPEN
        ROOT+'script/app/jquery-open.js',
        //
        // Appeler tous les autres scripts ici

        //
        // CLOSE
        ROOT+'script/app/jquery-close.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(resolveDependencies({
        pattern: /\* @requires [\s-]*(.*?\.js)/g
    }))
    .pipe(concat('vendor.js'))
    //.pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(target.build+'script'));
});

/*
|--------------------------------------------------------------------------
| COPY AND PASTE ASSETS
|--------------------------------------------------------------------------
*/
gulp.task('asset', function() {

    var modernizr = gulp.src(ROOT+'script/plugin/modernizr/modernizr.js')
        //.pipe(gulp.dest(target.dev+'script'))
        .pipe(gulp.dest(target.build+'script'));

    var detectizr = gulp.src(ROOT+'script/plugin/detectizr/detectizr.js')
        //.pipe(gulp.dest(target.dev+'script'))
        .pipe(gulp.dest(target.build+'script'));

    var jquery = gulp.src(ROOT+'script/plugin/jquery/jquery-3-3-1.js')
        //.pipe(gulp.dest(target.dev+'script'))
        .pipe(gulp.dest(target.build+'script'));

    var font = gulp.src(ROOT+'font/**/*.*')
        .pipe(gulp.dest(target.dev+'font'))
        .pipe(gulp.dest(target.build+'font'));

    var img = gulp.src(ROOT+'img/**/*')
        .pipe(gulp.dest(target.dev+'img'))
        .pipe(gulp.dest(target.build+'img'));

    return merge(img, font, jquery, detectizr, modernizr);
});

/*
|--------------------------------------------------------------------------
| WATCH TASKS
|--------------------------------------------------------------------------
*/
gulp.task('watch', function() {
    gulp.watch(ROOT+'style/**/*.scss', ['style']);
    gulp.watch(ROOT+'style/print.scss', ['print']);
    gulp.watch(ROOT+'script/plugin/*.js', ['script-plugin']);
    gulp.watch(ROOT+'script/app/*.js', ['script-app']);
    gulp.watch(ROOT+'twig/**/*.html', ['twig']);
});

/*
|--------------------------------------------------------------------------
| PRINT CSS
|--------------------------------------------------------------------------
*/
gulp.task('print', function () {
    return gulp.src(ROOT+'style/print.scss')
    .pipe(sass())
    .pipe(concat('print.css'))
    //.pipe(gulp.dest(target.dev+'style'))
    .pipe(gulp.dest(target.build+'style'));
});
