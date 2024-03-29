// импорт класса EventEmitter из модуля 'events'
import EventEmitter from 'events';
// импорт функции readFile и writeFile из модуля 'node: fs'.
import { readFile, writeFile } from 'node:fs';
//vимпорт класса Task из локального файла с именем 'task.js'.
import { Task } from './task.js';

//Экспортируем класс TaskManager, который наследуется от класса EventEmitter.
export class TaskManager extends EventEmitter{
    constructor() {
        super();//Вызов конструктора родительского класса
        this.tasks=[];
        this.path = "./tasks.json";
    }
    
    //Метод loadTasks загружает задачи из JSON, используя функцию readFile
    loadTasks() {
        return new Promise((resolve, reject) => {
            const path = "./tasks.json";
            //Чтение из файла
            readFile(path, 'utf8', (err, data) => {
                if (err) {
                    console.error("Ошибка чтения файла с задачами", err);
                    reject(err);//Если происходит ошибка, выводится сообщение об ошибке 
                    //и промис отклоняется с этой ошибкой.
                    return;
                }
                //преобразование данных из формата JSON в объект JS
                const obj = JSON.parse(data);
                //const tasks = obj.map(task => new Task(task.id, task.description, task.status));
                resolve(tasks);
                
                //преобразование каждого элемента массива в экземпляры класса TaskModel,
                  this.tasks = obj.map(task => {
                      const newTask = new TaskModel(task);
                      //каждая задача сохраняется
                      newTask.save();
                      return newTask;
                 })
                  //Генерация события
                this.emit('tasksLoaded', tasks);
            });
        });
    }
    
    //Метод для вывода задач в консоль
    printTasks(tasks) {
        if (!tasks || tasks.length === 0) {
            console.log("Нет задач, которые можно было бы напечатать.");
            return;
        }
// Перебор задач и вызов метода ToString() для каждой задачи
        tasks.forEach(task => {
            task.ToString();
        });
    }
    
    //Метод для сохранения задач в файл
    async saveTasks(tasks) {
        return new Promise((resolve, reject) => {
            //Преобразование массива задач в формат JSON
            const tasksJson = JSON.stringify(tasks, null, 2);
            writeFile(this.path, tasksJson, 'utf8', (err) => {
                if (err) {
                    console.error("Ошибка записи задачи в файл: ", err);
                    reject(err);//Если происходит ошибка, выводится сообщение об ошибке 
                    //и промис отклоняется с этой ошибкой.
                    return;
                }
                resolve();
                //Генерация события
                this.emit('tasksSaved', tasks);
            });
        });
    }

//Метод для добавления новой задачи
    async addTask(task) {
        try {
            //загрузка текущих задач
            const tasks = await this.loadTasks();
            //Добавление новой задачи в массив
            tasks.push(task);
            //Генерация события
            this.emit('taskAdded', task);
            //Сохранение обновленного списка задач
            await this.saveTasks(tasks);
            
            console.log("Задача успешно добавлена.");
        } catch (error) {
            console.error("Ошибка добавления задачи: ", error);
        }
    }

//Метод для удаление задачи по ID
    async deleteTask(taskId) {
        try {
            //загрузка текущих задач
            const tasks = await this.loadTasks();
            //Поиск задачи по ID
            const index = tasks.findIndex(task => task.id === taskId);
            
            if (index !== -1) {
                //Удаление задачи из массива
                const deletedTask = tasks.splice(index, 1)[0];
               //Генерация события
                this.emit('taskDeleted', deletedTask)
               //Сохранение обновленного списка задач
                await this.saveTasks(tasks);
                
                console.log("Задача успешно удалена.");
            } else {
                console.log("Задача не найдена.");
            }
        } catch (error) {
            console.error("Ошибка при удалении задачи: ", error);
        }
    }
}
