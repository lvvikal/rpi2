// Объявление класса Task
export class Task {
    constructor(id, description, status) {
        this.id = id;
        this.description = description;
        this.status = status;
    }
 //метод для вывода информации о задаче в консоль
    ToString(){
        console.log(`id = ${this.id}, description = ${this.description}, status = ${this.status}`);
    }
}