var gulp         = require('gulp'), // Подключаем Gulp
    sass         = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync  = require('browser-sync'), // Подключаем Browser Sync
    jade         = require('gulp-jade'),
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('app/sass/**/*.sass') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});
gulp.task('jade', function() {
    return gulp.src('app/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('app')) // указываем gulp куда положить скомпилированные HTML файлы
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});
gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/libs.css') // Выбираем файл для минификации
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

gulp.task('watch', ['browser-sync', 'css-libs', 'jade'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
});



gulp.task('build', ['sass', 'browser-sync'], function() {

    var buildCss = gulp.src([ // Переносим библиотеки в продакшен
        'app/css/main.css',
    ])
        .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/fonts'))


    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));

});

gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('default', ['watch']);