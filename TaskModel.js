//модель для работы с базой данных.
import mongoose from 'mongoose';
//описываем схему для класса Task
const taskSchema = new mongoose.Schema({
    id: String,
    description: String,
    status: String
});

const TaskModel = mongoose.model('Task', taskSchema);

export default TaskModel;