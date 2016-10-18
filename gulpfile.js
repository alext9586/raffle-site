var gulp = require("gulp");
var sass = require("gulp-sass");
var shell = require('gulp-shell')

//-----------------------------------------------------------------------------
// Typescript configuration
// https://www.typescriptlang.org/docs/handbook/gulp.html
gulp.task("ts-build", shell.task("tsc"));

// Sass configuration
// https://code.visualstudio.com/docs/languages/css#_transpiling-sass-and-less-into-css
gulp.task("sass-build", function() {
    var outputDir = "./stylesheets";
    gulp.src("./scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest(outputDir));
});

gulp.task("sass-watch", ["sass-build"], function() {
    gulp.watch("./scss/*.scss", ["sass-build"]);
});

gulp.task("build", ["sass-build", "ts-build"]);