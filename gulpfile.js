const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

// pull in the project Typescript config
const tsProject = ts.createProject('tsconfig.json');
//task to be run when the watcher detects changes
gulp.task('compile', () => {
    const tsResult = 
    gulp.src('src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(tsProject());

    return tsResult.pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../src'}))
    .pipe(gulp.dest('./build'));
});

//set up a watcher to watch over changes
gulp.task('watch', ['scripts'], () => {
    gulp.watch('**/*.ts', ['scripts']);
});

gulp.task('copy', () => {
    return gulp.src('src/**/*.+(html|js|css)')
        .pipe(gulp.dest('build'));
});

gulp.task('default', ['compile', 'copy']);