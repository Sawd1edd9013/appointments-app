# Appointments App

Fullstack-приложение для записи пациентов на приём. Оператор авторизуется в системе и управляет списком записей — может просматривать, создавать, редактировать и удалять заявки.

---

## Стек технологий

**Frontend**
- React
- React Router
- Axios
- Vite

**Backend**
- Node.js
- Express
- MongoDB + Mongoose
- JWT-аутентификация (Bearer token)

---

## Функциональность

- Авторизация оператора через JWT
- Защищённые маршруты (доступны только после входа)
- Просмотр списка всех записей пациентов
- Создание новой записи (имя пациента, телефон, комментарий)
- Редактирование существующей записи
- Удаление записи
- Валидация форм на клиенте и сервере

---

## Структура проекта

```
appointments-app/
├── client/
│   └── src/
│       ├── api/          # Запросы к серверу (записи, авторизация)
│       ├── components/   # AppointmentForm, AppointmentList, ProtectedRoute
│       └── pages/        # LoginPage, ListPage, CreatePage, EditPage
└── server/
    ├── controllers/      # Логика записей и авторизации
    ├── middlewares/      # Проверка JWT-токена
    ├── models/           # Mongoose-схема Appointment
    └── routes/           # Маршруты записей и авторизации
```

---

## 🚀 Запуск проекта

### Требования
- Node.js v18+
- MongoDB (локально или MongoDB Atlas)

### Backend

```bash
cd server
npm install
```

Создать файл `.env` в папке `server`:

```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/appointments
JWT_SECRET=your_secret_key
OPERATOR_EMAIL=admin@example.com
OPERATOR_PASSWORD=your_hashed_password
```

```bash
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Приложение откроется на `http://localhost:5173`

---

## Автор

Дарья Лобанова — [GitHub](https://github.com/Sawd1edd9013)

> Учебный проект курса Frontend-разработки, Result University, 2025
