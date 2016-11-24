var gulp = require("gulp");
var sass = require("gulp-sass");
var shell = require("gulp-shell");
var concat = require("gulp-concat");

var bundleFiles = require('./bundle.files.json');

//-----------------------------------------------------------------------------
// Typescript configuration
// https://www.typescriptlang.org/docs/handbook/gulp.html
gulp.task("ts-build", shell.task("tsc"));

gulp.task("ts-watch", shell.task("tsc -w"));

// Sass configuration
// https://code.visualstudio.com/docs/languages/css#_transpiling-sass-and-less-into-css
gulp.task("sass-build", function() {
    var outputDir = "./stylesheets";
    return gulp.src("./app/styles/*.scss")
        .pipe(sass())
        .pipe(gulp.dest(outputDir));
});

gulp.task("sass-watch", ["sass-build"], function() {
    return gulp.watch("./app/styles/*.scss", ["sass-build"]);
});

gulp.task("ts-concat", ["ts-build"], function() {
    return gulp.src(bundleFiles.scripts)
        .pipe(concat("bundle.js"))
        .pipe(gulp.dest("./"));
});

gulp.task("build", ["sass-build", "ts-concat"]);

gulp.task("watch", ["sass-watch", "ts-watch"]);