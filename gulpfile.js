const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

// pull in the project Typescript config
//task to be run when the watcher detects changes
gulp.task('compile', () => {
    const tsProject = ts.createProject('tsconfig.json');
    const tsResult =
        gulp.src([
            'src/**/*.ts',
            '!src/client/**/*.ts'
        ])
            .pipe(sourcemaps.init())
            .pipe(tsProject());

    return tsResult.pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '../src' }))
        .pipe(gulp.dest('./build'));
});

gulp.task('compile:client', () => {
    const tsProject = ts.createProject('tsconfig.json');
    const tsResult =
        gulp.src('src/client/**/*.ts')
            .pipe(sourcemaps.init())
            .pipe(tsProject());

    return tsResult.pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '../../src/client' }))
        .pipe(gulp.dest('./build/client'));
});

//set up a watcher to watch over changes
gulp.task('watch', ['compile', 'compile:client', 'copy'], () => {
    gulp.watch('./src/server/**/*.ts', ['compile']);
    gulp.watch('./src/client/**/*.ts', ['compile:client']);
    gulp.watch('./src/client/**/*.+(html|js|css)', ['copy']);
});

gulp.task('copy', () => {
    return gulp.src('src/**/*.+(html|js|css)')
        .pipe(gulp.dest('build'));
});

gulp.task('default', ['compile', 'compile:client', 'copy']);