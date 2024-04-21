class TaskManager {
    constructor(id, title, description, dueDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.tasks = [];
        const myLocalTasks = localStorage.getItem('tasks');
        this.tasks = myLocalTasks ? JSON.parse(myLocalTasks) : [];
    }
    save() {
        // Create a new task and save it in localstorage
        const task = {
            id: this.id,
            title: this.title,
            description: this.description,
            dueDate: this.dueDate
        };
        this.tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        return task;
    }
    getlastTask() {
        // Get the last task added
        return this.tasks[this.tasks.length - 1];
    }
    getTaskById(id) {
        // Get a task by id
        return this.tasks.filter(task => task.id === id)[0];
    }
}
export default TaskManager;
