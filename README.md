# Тестовое задание

## Описание

Постовое приложение позволяет пользователям просматривать, редактировать и создавать посты, используя API JSONPlaceholder. Это приложение разработано с использованием React Native Expo и Redux Toolkit, что обеспечивает быстрый и отзывчивый интерфейс для взаимодействия с постами.

## Технологии

- **React Native**: Библиотека для создания мобильных приложений.
- **Redux Toolkit**: Инструмент для управления состоянием приложения.
- **React Navigation**: Библиотека для навигации между экранами.
- **API**: Используется JSONPlaceholder для работы с постами.
- **Figma**: Дизайн макета интерфейса.

## Основные функции

1. **Главный экран**:

  <img src="https://github.com/anluko/screenshotes/blob/master/PostsScreen.jpg" alt="Image 1" width="200"/>
     
   - Отображает список постов с заголовками и коротким описанием.
   - Позволяет переходить на экран с детальной информацией о посте.
2. **Экран детальной информации**:

<img src="https://github.com/anluko/screenshotes/blob/master/PostDetailsScreen.jpg" alt="Image 1" width="200"/>

   - Показывает заголовок и полный текст поста.
   - Предоставляет кнопки для редактирования и удаления поста.

3. **Комментарии**:

<img src="https://github.com/anluko/screenshotes/blob/master/PostCommentsScreen.jpg" alt="Image 1" width="200"/>

   - Показывает все имеющие комментарии поста.
   - Имеется возможность оставить новый комментарий.

4. **Экран редактирования**:

<img src="https://github.com/anluko/screenshotes/blob/master/UpdatePostScreen.jpg" alt="Image 1" width="200"/>

   - Включает форму для редактирования заголовка и текста поста.
   - Сохраняет изменения и обновляет данные через API.

5. **Экран создания поста**:

<img src="https://github.com/anluko/screenshotes/blob/master/CreatePostScreen.jpg" alt="Image 1" width="200"/>

   - Позволяет создавать новый пост с заголовком и текстом.
   - Добавляет пост в список через POST запрос к API.

## Инструкция по использованию

### Установка

1. **Клонируйте репозиторий**:
   ```bash
   git clone https://github.com/anluko/ReactNativeTest.git
2. **Перейдите в директорию проекта**:
   ``` 
   cd место вашего репозитория
4. **Установите зависимости**:
   ``` 
   npm install
   
### Запуск приложения

1. **Запуск на android**:
   ``` 
   expo start --android
2. **Запуск на ios**:
   ``` 
   expo start --ios
