'use strict';

var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var zip = require('gulp-zip');

gulp.task("dist" , function(){
   return gulp.src(["./src/.babelrc","./src/gulpfile.babel.js","./src/package.json"])
    .pipe( gulp.dest("./dist") )
    .pipe(zip("generator-dstyle.zip"))
    .pipe( gulp.dest("./dist") );
});