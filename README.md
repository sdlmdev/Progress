# Progress

Прототип блока ProgressBar для использования в мобильных web-приложениях.
Основное предназначение блока отображать процесс выполнения процессов и их прогресс
выполнения.

## Функционал

- Отображение прогресса процесса
- Управление размером дуги
- Управление состоянием анимации дуги
- Управление состоянием видимости блока

## API

- setValue(value) устанавливает значение размера дуги (принимает значение от 0 до 100)
- setAnimating(isAnimated) устанавливает значение состояния анимации дуги (принимает булево значение)
- setHiding(isHidden) устанавливает значение состояния видимости блока (принимает булево значение)

## Используемые технологии

- HTML
- JavaScript
- ESLint
- Prettier
- Sass
- Vite

## Установка и запуск проекта

- Клонировать репозиторий: `git clone https://github.com/sdlmdev/Progress.git`
- Установить зависимости: `npm install`
- Запустить проект: `npm run start`

### Статус проекта: Завершен

### Задача

- Блок должен иметь API для управления его состоянием
- Блок должен быть спроектирован так, чтобы его было легко переиспользовать в
  других приложениях
- Результат выполнения задачи должен быть представлен в виде небольшого
  приложения с элементами управления (Value – текстовый ввод числа от 0 до 100,
  Animate и Hide – логические переключатели on / off
- Приложение должно быть адаптирующимся под ориентацию экрана – будет большим
  плюсом
- Состояния:
  - Normal – базовое состояние, в котором путём задания Value можно управлять
    размером дуги, отражающей некоторый параметр или прогресс процесс. Начало
    дуги соответствует 12 часам, конец дуги при увеличении параметра Value
    движется по направлению часовой стрелки и достигает начала при значении 100
  - Animated – независимое состояние, при котором блок или его элементы
    начинают вращаться с некоторым периодом по часовой стрелке.
  - Hidden – состояние скрывающее блок со страницы
- Технологии:
  - JS (без jQuery и других библиотек / фреймворков, упрощающих и дополняющих
    функциональность окружения браузера)
  - CSS или любые другие пре/постпроцессоры
  - HTML (без использования шаблонизаторов)
- Публикация на gh pages
