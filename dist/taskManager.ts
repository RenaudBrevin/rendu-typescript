import { Task } from './models.js';

class TaskManager {
    tasks: Task[];

    constructor(private id: number, private title: string, private description: string, private dueDate: Date) {
        this.tasks = [];

        const myLocalTasks = localStorage.getItem('tasks');
        this.tasks = myLocalTasks ? JSON.parse(myLocalTasks) : [];
    }

    save(): Task {
        // Create a new task and save it in localstorage
        const task: Task = {
            id: this.id,
            title: this.title,
            description: this.description,
            dueDate: this.dueDate
        };
        this.tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        return task;
    }

    getlastTask(): Task {
        // Get the last task added
        return this.tasks[this.tasks.length - 1];
    }

    getTaskById(id: number): Task {
        // Get a task by id
        return this.tasks.filter(task => task.id === id)[0];
    }
}

export default TaskManager;
