Домашнее задание 5
Добавляет возможность загрузки аватарки пользователя через Multer.

В схему пользователя добавлено новое свойство avatarURL для хранения изображения.

{
  ...
  avatarURL: String,
  ...
}
Используется пакет gravatar для того чтобы при регистрации нового пользователя сразу сгенерить ему аватар по его email.

При регистрации пользователя:

Создается ссылку на аватарку пользователя с помощью gravatar
Полученный URL хранится в поле avatarURL во время создания пользователя

Добавлена возможность обновления аватарки.

avatar upload from postman

# Запрос
PATCH /users/avatars
Content-Type: multipart/form-data
Authorization: "Bearer {{token}}"
RequestBody: загруженный файл

# Успешный ответ
"status": "success",
    "code": 200,
    "date": {
        "avatar": "тут будет ссылка на изображение"
    }

# Неуспешный ответ
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}


1.  unit-тесты для мидлвара по авторизации
При помощи Jest
