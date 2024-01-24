const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const htmlclean = require('gulp-htmlclean');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const csso = require('gulp-csso');
const maps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');

// Task for HTML
gulp.task('html', function(){
    return gulp
        .src('./src/*.html')
        .pipe(changed('./docs/', {hasChanged: changed.compareContents}))
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'HTML',
                message: 'Error <%= error.message %>',
                sound: false // On/Off sound error
            })
        }))
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(replace('./scss/main.scss', './css/main.min.css')) // Replace the stylesheet link in the source HTML
        .pipe(replace('./js/search.js', './js/search.bundle.js')) // Replace link search
        .pipe(replace('./js/mobile.js', './js/mobile.bundle.js')) // Replace link mobile
        .pipe(replace('./js/sliderHero.js', './js/sliderHero.bundle.js')) // Replace link slider hero
        .pipe(replace('./js/sliderBecome.js', './js/sliderBecome.bundle.js')) // Replace link slider become
        .pipe(replace('./js/modal.js', './js/modal.bundle.js')) // Replace link modal
        .pipe(htmlclean()) // Without placeholder
        // .pipe(htmlclean({
        //     protect: /<\!--%fooTemplate\b.*?%-->/g,
        //     edit: function(html) { return html.replace(/\begg(s?)\b/ig, 'omelet$1'); }
        // }))
        .pipe(gulp.dest('./docs/'));
});

// Task for SCSS (min.css)
gulp.task('sass', function() {
    return gulp
        .src('./src/scss/*.scss')
        .pipe(changed('./docs/css/'))
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'Styles',
                message: 'Error <%= error.message %>',
                sound: false // On/Off sound error
            })
        }))
        .pipe(maps.init())
        .pipe(autoprefixer())
        .pipe(sass())
        .pipe(rename({ basename: "main", suffix: ".min", extname: ".css" })) // Rename compiled CSS to main.min.css
        .pipe(csso()) // CSS minification
        .pipe(maps.write())
        .pipe(gulp.dest('./docs/css/'));
});

// Task for Fonts
gulp.task('fonts', function(){
    return gulp
        .src('./src/fonts/**/*')
        .pipe(changed('./docs/fonts/'))
        .pipe(gulp.dest('./docs/fonts/'));
});

// Task for Images
gulp.task('images', function(){
    return gulp
        .src('./src/img/**/*')
        .pipe(changed('./docs/img/'))
        .pipe(imagemin({ verbose: true }))
        .pipe(gulp.dest('./docs/img/'));
});

// Task for JavaScript
gulp.task('js', function(){
    return gulp
        .src('./src/js/*.js')
        .pipe(changed('./docs/js/'))
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'JS',
                message: 'Error <%= error.message %>',
                sound: false // On/Off sound error
            })
        }))
        .pipe(babel())
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(uglify()) 
        .pipe(gulp.dest('./docs/js/'))
})

// Task for Server
gulp.task('server', function(){
    return gulp
        .src('./docs/')
        .pipe(server({
            livereload: true,
            open: true
        }));
});

// Task for Clean docs
gulp.task('clean', function(done){
    if(fs.existsSync('./docs/')){
        return gulp
        .src('./docs/', { read: false })
        .pipe(clean({ force: true }));
    }
    done();
});

// Task for Watch
gulp.task('watch', function(){
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('./src/**/*.html', gulp.parallel('html'));
    gulp.watch('./src/fonts/**/*', gulp.parallel('fonts'));
    gulp.watch('./src/img/**/*', gulp.parallel('images'));
    gulp.watch('./src/js/**/*.js', gulp.parallel('js'));
});

// Task Default
gulp.task('default', 
    gulp.series('clean', gulp.parallel('html', 'sass', 'fonts', 'images', 'js'), 
    gulp.parallel('server', 'watch')
));