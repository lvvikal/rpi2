import { TaskManager } from "./task-manager.js";
import { Task } from "./task.js";

//Создание экземпляра TaskManager
const taskManager = new TaskManager();

// Функция-обработчик события 'tasksLoaded'
function onTasksLoaded(tasks) {
    console.log("Загружены следующие задачи:");
    taskManager.printTasks(tasks);
    console.log("onTasksLoaded end");
}

// Функция-обработчик события 'tasksSaved'
function onTasksSaved() {
    console.log("Список задач успешно сохранен.");
    console.log("onTasksSaved end");
}

// Функция-обработчик события 'taskCreated'
function onTaskAdded(addedTask) {
    console.log('Задача успешно добавлена:', addedTask);
    console.log("onTaskAdded end");
}

// Функция-обработчик события 'taskDeleted'
function onTaskDeleted(deletedTaskId) {
    console.log('Задача успешно удалена. ID задачи:', deletedTaskId);
    console.log("onTaskDeleted end");
}

// Добавление обработчиков событий
taskManager.on('tasksLoaded', onTasksLoaded);
taskManager.on('tasksSaved', onTasksSaved);
taskManager.on('taskCreated', onTaskAdded);
taskManager.on('taskDeleted', onTaskDeleted);

// Создание тестовой задачи
const testTask = new Task("4", 'Тестовая задача', 'В процессе');

try {
    // Загрузка задач
   // const tasks = await taskManager.loadTasks();
    // Добавление тестовой задачи
   //await taskManager.addTask(testTask);
    // Удаление тестовой задачи
    await taskManager.deleteTask("4");
} catch (error) {
    console.error('Ошибка:', error);
}finally {
    // Удаление обработчиков событий после выполнения операций с задачами
    taskManager.removeListener('tasksLoaded', onTasksLoaded);
    taskManager.removeListener('tasksSaved', onTasksSaved);
    taskManager.removeListener('taskCreated', onTaskAdded);
    taskManager.removeListener('taskDeleted', onTaskDeleted);
}
