---
layout: post
title: 我的Gulp自动化流程
tags: [Gulp, 前端自动化]
categories: tech-post
excerpt: Gulp is a streaming build system, intended for automating and enhance your workflow， 它是一个服务于前端工程自动化的强有力工具，其工作性质和C++ 的make，Java中的Ant， Maven差不多，都是为了方便开发而设计的
---
### 简介
__Gulp is a streaming build system, intended for automating and enhance your workflow__

上面是gulp官方给出的定义，表明它是一个服务于前端工程自动化的强有力工具，其工作性质和C++ 的make，Java中的Ant， Maven差不多，都是为了方便开发而设计的。

相对于Grunt，它具有如下优点：

1. 易于使用：采用代码优于配置策略，Gulp让简单的事情继续简单，复杂的任务变得可管理。
2. 高效：通过利用Node.js强大的流，不需要往磁盘写中间文件，可以更快地完成构建。
3. 高质量：Gulp严格的插件指导方针，确保插件简单并且按你期望的方式工作。
4. 易于学习：通过把API降到最少，你能在很短的时间内学会Gulp。构建工作就像你设想的一样：是一系列流管道。

下面是我常用的gulp工作流，如有错误，欢迎指正：

~~~javascript

var gulp = require("gulp");
var pug = require("gulp-pug");    // jade template engine

var sass = require("gulp-sass");
var cleanCss = require("gulp-clean-css");   // css minify
var autoprefixer = require("gulp-autoprefixer");

var livescript = require("gulp-livescript");
var jshint = require("gulp-jshint");    // js hint
var concat = require("gulp-concat");    // js concat
var uglify = require("gulp-uglify");    // js uglify
var rename = require("gulp-rename");    // rename

var webserver = require("gulp-webserver");  // a simple webserver
var livereload = require("gulp-livereload");    // livereload

var clean = require("gulp-clean");
var errorNotifier = require('gulp-error-notifier');


gulp.task("serve", function() {
    gulp.src("./")
        .pipe(webserver({
            livereload:true,
            open:true,
            directoryListing: false
        }));
});

gulp.task("templates", function() {
    var src = "./src/templates/*.jade";
    var dist = "./";

    gulp.src(src)
        .pipe(errorNotifier.handleError(
            pug()
        ))
        .pipe(gulp.dest(dist));
});

gulp.task("style", function() {
    var src = "./src/scss/*.scss";
    var dist = "./dist/css/";

    gulp.src(src)
        .pipe(errorNotifier.handleError(
            sass()
        ))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({suffix: ".min"}))
        .pipe(cleanCss())
        .pipe(gulp.dest(dist));
});

gulp.task("script", function() {
    var src = "./src/js/*.js";
    var dist = "./dist/js/";

    gulp.src(src)
        // .pipe(errorNotifier.handleError(
        //     livescript({
        //         bare: true
        //     })
        // ))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat("main.js"))
        .pipe(rename({suffix: ".min"}))
        //.pipe(uglify())
        .pipe(gulp.dest(dist));
});

gulp.task("clean", function() {
    var target = "./dist/*";

    gulp.src([target], {read: false})
        .pipe(clean());
});

gulp.task("watch", function() {
    gulp.watch("./src/templates/*.jade", ["templates"]);

    gulp.watch("./src/scss/*.scss", ["style"]);

    gulp.watch("./src/js/*.js", ["script"]);
});

gulp.task("default", function() {
    gulp.start("templates", "style", "script", "serve", "watch");
});


// if development is node, just add nodemon
/*var nodemon = require('gulp-nodemon');

gulp.task('nodemon', function() {
    return nodemon({
        script: 'app.js',
        env: {
            'NODE_ENV': 'development'
        }
    })
});*/
~~~

### 链接

[Gulp Official Site](http://gulpjs.com/)
