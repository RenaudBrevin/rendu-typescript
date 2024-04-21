import CategoryManager from "./categoryManager.js";
class StorageManager {
    getCategories() {
        // Get categories from localstorage
        return JSON.parse(localStorage.getItem('categories') || '[]');
    }
    getTasks() {
        // Get tasks from localstorage
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }
    addTaskToCategory(task, priority) {
        // Add task to category priority conrresponding
        const categories = this.getCategories();
        const category = CategoryManager.getCategoryByPriority(categories, priority);
        if (category) {
            category.tasks.push(task);
            localStorage.setItem('categories', JSON.stringify(categories));
        }
    }
    deleteTask(task) {
        // Delete task from localstorage
        const tasks = this.getTasks();
        const categories = this.getCategories();
        const newTasks = tasks.filter(t => t.id !== task.id);
        const newCategories = categories.map(category => {
            category.tasks = category.tasks.filter(t => t.id !== task.id);
            return category;
        });
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        localStorage.setItem('categories', JSON.stringify(newCategories));
    }
    getLastTaskId() {
        // Get the last task id
        const tasks = this.getTasks();
        let maxId = 0;
        tasks.forEach(task => {
            if (task.id > maxId) {
                maxId = task.id;
            }
        });
        return maxId;
    }
    saveTasks(tasks) {
        // Save tasks to localstorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
export default StorageManager;
