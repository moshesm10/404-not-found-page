const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');


const path = {
    build: {
        html: 'build/',
        css: 'build/css/',
        image: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        style: 'src/scss/main.scss',
        image: 'src/img/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        style: 'src/scss/**/*.scss',
        image: 'src/img/*.*',
        fonts: 'src/fonts/**/*.*'
    },
};

function html () {
    return gulp.src(path.src.html) 
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.reload({stream: true}))
}

function style () {
    return gulp.src(path.src.style)
            .pipe(sass())
            .pipe(autoprefixer({
                cascade: false
            }))
            .pipe(gulp.dest(path.build.css))
            .pipe(browserSync.stream())
}

function fonts () {
    return gulp.src(path.src.fonts)
            .pipe(gulp.dest(path.build.fonts))
}

function image () {
    return gulp.src(path.src.image)
            .pipe(gulp.dest(path.build.image))
}

function watch () {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    })
    gulp.watch(path.watch.style, style);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.image, image);
    gulp.watch(path.watch.fonts, fonts);
}

function build() {
    style();
    html();
    image();
    fonts();
    watch();
}

exports.html = html;
exports.style = style;
exports.image = image;
exports.fonts = fonts;
exports.watch = watch;
exports.build = build;