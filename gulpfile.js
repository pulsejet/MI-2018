var gulp = require('gulp');
const noop = require('gulp-noop');
const htmlmin = require('gulp-htmlmin');
let cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var nunjucksRender = require('gulp-nunjucks-render');
var webpack = require('webpack');
var webpack_config = require('./webpack.config.js');
var webpack_config_prod = require('./webpack.config.prod.js');
var browserSync = require('browser-sync').create();
const isProd = process.env.NODE_ENV === 'production';

gulp.task('webpack', function() { webpack(isProd ? webpack_config_prod : webpack_config).run(); });
gulp.task('webpack-watch', ['webpack'], function (done) { browserSync.reload(); done(); });

gulp.task('assets', function() {
    gulp.src(['src/images/**/*']).pipe(gulp.dest('build/images/'));
});

gulp.task('styles', function() {
   gulp.src(['src/styles/*.css'])
   .pipe(concat('styles.css'))
   .pipe(cleanCSS())
   .pipe(gulp.dest('build/'));
});
gulp.task('css-watch', ['styles'], function (done) { browserSync.reload(); done(); });

gulp.task('nunjucks', function() {
    return gulp.src('src/pages/*.+(html|nunjucks)')
    .pipe(nunjucksRender({
        path: ['src/templates']
    }))
    .pipe(isProd ? htmlmin({
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
    }) : noop())
    .pipe(gulp.dest('build/'))
});
gulp.task('nunjucks-watch', ['nunjucks'], function (done) { browserSync.reload(); done(); });

gulp.task('build', ['webpack', 'styles', 'nunjucks', 'assets'], function(){});

gulp.task('serve', ['build'], function () {
    browserSync.init({
        server: {
            baseDir: "./build/",
            serveStaticOptions: {
                extensions: ['html']
            }
        }
    });
    gulp.watch("src/**/*.nunjucks", ['nunjucks-watch']);
    gulp.watch("src/**/*.html", ['nunjucks-watch']);
    gulp.watch("src/**/*.js", ['webpack-watch']);
    gulp.watch("src/**/*.css", ['css-watch']);
});
