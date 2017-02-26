/* eric/css-zen-garden
*
* /gulpfile.js - gulp tasks
*
* code by closquet.eric@live.be
* started at 25/02/2017
*/

//--Config--//
var src = {
    img: "src/images/**",
    scss: "src/sass/**/*.scss"
},
    dest = {
    img: "./",
    css: "./"
};


//--Require--//
var gulp = require("gulp"),
    image = require("gulp-image"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    csso = require("gulp-csso"),
    browserSync = require('browser-sync').create();

// --- Task for images

gulp.task( "images", function () {
    gulp.src( src.img )
    .pipe( image() )
    .pipe( gulp.dest( dest.img ) )
} );


// --- Task for styles

gulp.task( "css", function () {
    gulp.src( src.scss )
    .pipe( sass().on( "error" , sass.logError ) )
    .pipe( autoprefixer() )
    .pipe( csso() )
    .pipe( gulp.dest( dest.css ) )
} );


// --- Task for browser-sync

gulp.task( "browserSync", function() {
    browserSync.init( {
        server: {
            baseDir: "./"
        }
    } );
} );

// --- Task for watch

gulp.task( "watch", [ "browserSync" ], function () {
    gulp.watch( src.img, [ "images" ] );
    gulp.watch( src.scss, [ "css" ] );

    gulp.watch( dest.css + "/**/*.css", browserSync.reload );
} );

// --- Task for alias

gulp.task( "default" , [ "images", "css" ]);
gulp.task( "work" , [ "default", "watch" ]);
