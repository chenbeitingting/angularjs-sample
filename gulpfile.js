var gulp=require('gulp'),
 
    minifycss = require('gulp-minify-css'),

    concat = require('gulp-concat'),

    uglify = require('gulp-uglify'),

    rename = require('gulp-rename'),

    del = require('del');

gulp.task('minifycss', function() {
    return gulp.src(['app/pc/css/*.css'])      //压缩的文件
        .pipe(concat('main.css'))    //合并所有js到main.js
        .pipe(rename({suffix: '.min'})) 
        .pipe(minifycss())  //执行压缩
        .pipe(gulp.dest('app/pc/minified/css'));

});
/*pc端js文件压缩*/
gulp.task('minifypcjs', function() {

    return gulp.src(['app/bower_components/jquery/dist/jquery.js','app/bower_components/angular/angular.js',
        'app/bower_components/angular-route/angular-route.js','app/bower_components/angular-resource/angular-resource.js',
        'app/bower_components/angular-animate/angular-animate.min.js','app/pc/js/*.js'])

        .pipe(concat('main.js'))    //合并所有js到main.js

        .pipe(gulp.dest('app/pc/minified/js'))    //输出main.js到文件夹

        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名

        .pipe(uglify())    //压缩

        .pipe(gulp.dest('app/pc/minified/js'));  //输出

});
/*telephone端js文件压缩*/
gulp.task('minifyphonejs', function() {

    return gulp.src(['app/bower_components/jquery-1.11.2.js','app/bower_components/angular/angular.js',
        'app/bower_components/angular-route/angular-route.js','app/bower_components/angular-resource/angular-resource.js',
        'app/bower_components/angular-animate/angular-animate.min.js','app/bower_components/ngInfiniteScroll-1.0.0/ngInfiniteScroll-1.0.0/build/ng-infinite-scroll.js',
        'app/telephone/js/*.js'])

        .pipe(concat('main.js'))    //合并所有js到main.js

        .pipe(gulp.dest('app/telephone/minified/js'))    //输出main.js到文件夹

        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名

        .pipe(uglify())    //压缩

        .pipe(gulp.dest('app/telephone/minified/js'));  //输出

});
gulp.task('clean', function(cb) {

    del(['app/pc/minified/css', 'app/pc/minified/js','app/telephone/minified/js'], cb)

});

gulp.task('default', ['clean'], function() {

    gulp.start('minifycss', 'minifypcjs','minifyphonejs');

});