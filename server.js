import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import TaskModel from './TaskModel.js';
import validateTaskData from './middlewares/validateTaskData.js';

const app = express();
const PORT = 3000;
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//Формирование URI для подключения к MongoDB
const mongoUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;
//Подключение к MongoDB
mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error: ', err));

//Создание маршрута для получения задач
    app.get("/tasks", async (req, res) => {
        try {
//Mongoose метод, который извлекает все записи из коллекции tasks в MongoDB            
            const tasks = await TaskModel.find();
//отправляет полученные задачи обратно клиенту в формате JSON            
            res.json(tasks);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });
    
    //Создание Маршрута для Добавления Задачи
    app.post("/tasks",validateTaskData, async (req, res) => {
        try {
//создает новый экземпляр модели задачи, используя данные, полученные из тела запроса            
            const newTask = new TaskModel(req.body);
//содержит сохраненную задачу, которая затем отправляется обратно клиенту.     
            const savedTask = await newTask.save();
            res.status(201).json(savedTask);
        } catch (err) {
            res.status(400).send(err.message);
        }
    });

//Создание Маршрута для Удаления Задачи    
    app.delete("/tasks/:id", async (req, res) => {
        try {
        //Извлечение параметра id из объекта    
            const { id } = req.params;
// Поиск и удаление задачи с указанным id            
            const deletedTask = await TaskModel.findOneAndDelete({ id });
            if (!deletedTask) {
                return res.status(404).send("Task not found");
            }
           //Отправка ответа в формате JSON 
            res.json(deletedTask);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });





