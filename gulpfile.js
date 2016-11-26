var gulp = require("gulp");
var sass = require("gulp-sass");
var shell = require("gulp-shell");
var concat = require("gulp-concat");
var templateCache = require("gulp-angular-templatecache");

var bundleFiles = require("./bundle.files.json");

//-----------------------------------------------------------------------------
// Typescript configuration
// https://www.typescriptlang.org/docs/handbook/gulp.html
gulp.task("ts-build", ["cache-template"], shell.task("tsc"));

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

gulp.task("cache-template", function () {
  return gulp.src(bundleFiles.templates)
    .pipe(templateCache("TemplateModule.ts", {
        module: "PageModule",
        templateHeader: 'module Raffle { angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {',
        templateFooter: '}]);}',
        transformUrl: function(url) {
            return "app/components/templates/" + url;
        }
    }))
    .pipe(gulp.dest("./app/modules/"));
});

gulp.task("ts-concat", ["ts-build"], function() {
    return gulp.src(bundleFiles.scripts)
        .pipe(concat("bundle.js"))
        .pipe(gulp.dest("./"));
});

gulp.task("build", ["sass-build", "ts-concat"]);

gulp.task("watch", ["sass-watch", "ts-watch"]);