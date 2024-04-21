import createData from './simulation.js';
import storageManager from './storageManager.js';
import { showTasksFromCategories, showTasksWithFilter, showTaskWithSearchBar } from './showTasks.js';
import TaskManager from './taskManager.js';
import CategoryManager from './categoryManager.js';
//  ########## //
// Create fake data for the application if there is no data in localstorage
if (localStorage.getItem('tasks') === null) {
    createData();
}
//  ########## //
const storage = new storageManager();
// Show tasks
showTasksFromCategories(storage.getCategories());
// Add task
const createTaskForm = document.querySelector('#taskForm');
createTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.querySelector('#taskTitle').value;
    const description = document.querySelector('#taskDescription').value;
    const dueDate = document.querySelector('#taskDueDate').value;
    const priority = document.querySelector('#taskPriority').value;
    const taskManager = new TaskManager(storage.getLastTaskId() + 1, title, description, new Date(dueDate));
    const task = taskManager.save();
    storage.addTaskToCategory(task, priority);
    showTasksFromCategories(storage.getCategories());
    createTaskForm.reset();
});
// Delete task
const taskContainer = document.getElementById('tasks');
taskContainer.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('delete-btn')) {
        let taskContainer = event.target.parentElement;
        // Get task and delete it
        if (taskContainer) {
            var task = new TaskManager(0, '', '', new Date()).getTaskById(parseInt(taskContainer.id));
            storage.deleteTask(task);
        }
        showTasksFromCategories(storage.getCategories());
    }
});
// Edit task
const editTaskForm = document.querySelector('#taskForm');
taskContainer.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('edit-btn')) {
        window.scrollTo({ top: 200, behavior: 'smooth' });
        let taskContainer = event.target.parentElement;
        // Get task and add data in create form
        if (taskContainer) {
            const taskId = parseInt(taskContainer.id);
            const task = new TaskManager(0, '', '', new Date()).getTaskById(taskId);
            if (task) {
                let category = new CategoryManager(0, '', '', []).getCategoryWithSpecificTask(taskId);
                document.querySelector('#taskTitle').value = task.title;
                document.querySelector('#taskDescription').value = task.description;
                document.querySelector('#taskDueDate').value = new Date(String(task.dueDate)).toISOString().split('T')[0];
                document.querySelector('#taskPriority').value = category ? category.categoryClass : '';
                editTaskForm.addEventListener('submit', (event) => {
                    event.preventDefault();
                    // Update task properties
                    task.title = document.querySelector('#taskTitle').value;
                    task.description = document.querySelector('#taskDescription').value;
                    task.dueDate = new Date(document.querySelector('#taskDueDate').value);
                    storage.deleteTask(task);
                    showTasksFromCategories(storage.getCategories());
                    editTaskForm.reset();
                });
            }
        }
    }
});
// Filter tasks
const filterPriority = document.querySelector('select#filterPriority');
const filterDueDate = document.querySelector('input#filterDate');
const buttonFilter = document.querySelector('button#applyFilter');
buttonFilter.addEventListener('click', (event) => {
    event.preventDefault();
    const priority = filterPriority.value;
    const dueDate = filterDueDate.value;
    showTasksWithFilter(storage.getCategories(), priority, dueDate);
});
// Search tasks
const searchTask = document.querySelector('input#searchInput');
searchTask.addEventListener('keyup', (event) => {
    event.preventDefault();
    const searchValue = searchTask.value;
    if (searchValue === '') {
        showTasksFromCategories(storage.getCategories());
    }
    else {
        showTaskWithSearchBar(storage.getCategories(), searchValue);
    }
});
