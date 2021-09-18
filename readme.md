### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі development
- `npm run lint` &mdash; запуск перевірки коду за допомогою eslint
- `npm lint:fix` &mdash; запуск перевірки коду за допомогою eslint з автоматичними виправленнями простих помилок

Для коректної роботи в корені проекту має бути файл config.js із наступним вмістом:

const DB_HOST = 'ваш_srv-рядок_для_підключення_до_бази_даних_MongoDB'
const SECRET_KEY = 'ваш_пароль_для_підключення_до_бази_даних_MongoDB'
const SENDGRID_KEY = 'ваш_ключ_для_розсилки_листів_через_SendGrid'
const SENDGRID_FROM = 'ваш_email_з_якого_розсилатимуться_листи'

module.exports = {
  DB_HOST,
  SECRET_KEY,
  SENDGRID_KEY,
  SENDGRID_FROM
}

