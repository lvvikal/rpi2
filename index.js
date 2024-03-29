//Импорт модуля mongoose для работы с MongoDB в Node.js.
import mongoose from 'mongoose';
//Импорт модуля dotenv,позволяет использовать переменные окружения из файла .env
import 'dotenv/config';
//Формирование URI для подключения к MongoDB
const mongoUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;
//Вывод URI подключения к MongoDB в консоль.
console.log(mongoUri);
//Подключение к MongoDB с использованием URI
mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error: ', err));