var gulp = require('gulp');
var sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
var notify = require("gulp-notify");
var browserSync = require('browser-sync').create();

gulp.task('sass', async function(){
  gulp.src(['scss/*.scss'])
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: true
      }))
      .pipe(gulp.dest('./style'))
  .pipe(browserSync.stream())
   .pipe(notify(" Success! \n Your CSS files are ready, Master."))
});

gulp.task('sass:watch', function(){
  gulp.watch(['scss/*.scss'], gulp.series('sass'));
});

gulp.task('browser-sync', function() {
  browserSync.init(["style/*.css", "*.html"], {
    server: {
      baseDir: "./"
    }
  })
});

gulp.task('watch', gulp.series('sass', gulp.parallel('sass:watch', 'browser-sync')));

gulp.task('default', gulp.series('watch'));
