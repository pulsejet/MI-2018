var gulp = require('gulp');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var nunjucksRender = require('gulp-nunjucks-render');
var webpack = require('webpack');
var webpack_config = require('./webpack.config.js');
var webpack_config_prod = require('./webpack.config.prod.js');

var browserSync = require('browser-sync').create();

gulp.task('webpack-prod', function() { webpack(webpack_config_prod).run(); });
gulp.task('webpack', function() { webpack(webpack_config).run(); });
gulp.task('webpack-watch', ['webpack'], function (done) { browserSync.reload(); done(); });

gulp.task('assets', function() {
    gulp.src(['src/images/**/*']).pipe(gulp.dest('build/images/'));
});

gulp.task('styles', function() {
   gulp.src(['src/styles/*.css'])
   .pipe(concat('styles.css'))
   .pipe(autoprefix('last 2 versions'))
   .pipe(minifyCSS())
   .pipe(gulp.dest('build/'));
});
gulp.task('css-watch', ['styles'], function (done) { browserSync.reload(); done(); });

gulp.task('nunjucks', function() {
    return gulp.src('src/pages/*.+(html|nunjucks)')
    .pipe(nunjucksRender({
        path: ['src/templates']
      }))
    .pipe(gulp.dest('build/'))
});
gulp.task('nunjucks-watch', ['nunjucks'], function (done) { browserSync.reload(); done(); });

gulp.task('build', ['webpack', 'styles', 'nunjucks', 'assets'], function(){});

gulp.task('build-prod', ['webpack-prod', 'styles', 'nunjucks', 'assets'], function(){});

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
