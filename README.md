# Стартовий шаблон для HTML/CSS/JS розробки
[web-systems](http://web-systems.solutions/) стартовий шаблон.
***

## Швидкий старт

1.  Встановити [node.js](https://nodejs.org)
2.  Встановити глобально [gulp-cli](https://gulpjs.com/docs/en/getting-started/quick-start)

	```sh
	npm install --global gulp-cli
	```

3.  Встановити глобально [bower](https://bower.io/)

	```sh
	npm install -g bower
	```

4. Встановити npm залежності і запустити сервер

   ```sh
   npm install && npm run dev
   ```
***

## Структура
`/src/` - папка для source коду

`/build/` -  тут буде кінцей зібраний проект

`/gulp/` - папка з задачами для [gulp](http://gulpjs.com/)
***

## Структура src
`/fonts/` - шрифти -> копіюються в `build/css/fonts`

`/img/` -  картинки -> копіюються в `build/img`

`/img/icons/` - генерується спрайт із всіх картнок що містяться у папці -> спрайт зберігається `build/img`, стилі та міксіни для спрайтів зберігаються в `/scss/lib/_sprite.sass`

`/img/svg/` -  генерується svg шрифт із всіх картнок що містяться у папці --> шрифт зберігається в `build/css/fonts`

`/js/` - js код

`/lib/` - зберігаються всі bower залежності

`/partials/` - html шаблони, можна інклудити за допомогою коментарів, [детально тут](https://www.npmjs.com/package/gulp-file-include)

`/scss/` - scss, [scss документація](http://sass-lang.com/)
***

## Основні задачі

- `npm run dev` - запуск проекту в режимі розробника
- `npm run build` - білдинг проектку в папку build
- `npm run clean` - очистка білда проеткта
- `npm run bower` - встановленя залежностей бібліотек bower
- `npm run lint-styles` - перевірка правильності синтаксису стилів
- `npm run lint-styles-fix` - перевірка правильності і автоматичне виправлення синтаксису стилів
- `npm run lint-scripts` - перевірка правильності синтаксису js/jquery скриптів
- `npm run lint-scripts-fix` - перевірка правильності і автоматичне виправлення синтаксису js/jquery скриптів

***

## Gulp задачі

задачі gulp-cli описані тут [gulp cli doc](https://github.com/gulpjs/gulp/blob/master/docs/CLI.md)

Назва задачі  | Команда для запуску  | Опис
------------- | -------------------- | -----
**copy**      | `gulp copy`          | Копіювання фалів `src -> build`
**html**      | `gulp html`          | Збирання `html` файлів
**iconfont**  | `gulp font`          | Генерування іконочного шрифту з svg картинок
**js**        | `gulp js`            | Збиранні компілювання та мінімізація `js` файлів
**sass**      | `gulp sass`          | Компілювання та мінімізація `scss` та `sass`
**server**    | `gulp server`        | Запуск сервера
**sprite**    | `gulp sprite`        | Генерування спрайтів з папки `src/icons`, та генерування стилів та міксінів для них `/scss/lib/_sprite.sass`
**clean**     | `gulp clean`         | Очищення папки `build`
**default**   | `gulp`               | Запуск спостерігачів за всіма файлами та перекомпіляція вразі зміни
**build**     | `gulp build`         | Запуск всіх задач для повної збірки проекту
**images**    | `gulp images`        | Оптимізація зображеть типу `.png .svg. jpg` з папки `./src/img/*` і копіювання результату оптимізації до папки `/build`

