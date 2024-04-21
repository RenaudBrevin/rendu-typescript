
//  ########## //

// This file is create only to simulate data. 
// It isn't used in the main application. 
// It's only to add data in localstorage at the first load of the application.

//  ########## //

import TaskManager from './taskManager.js';
import CategoryManager from './categoryManager.js';

function createData(): void {
    const listLevel: { [key: string]: string } = {'Faible': 'low', 'Moyenne': 'medium', 'Haute': 'high'};

    // Create 3 tasks and 3 categories
    for (let i = 0; i < 3; i++) {
        const categoryManager = new CategoryManager(i, Object.keys(listLevel)[i], listLevel[Object.keys(listLevel)[i]], []);

        const task = {
            id: i,
            title: `Tâche ${i}`,
            description: `Description de la tâche ${i}`,
            dueDate: new Date()
        };

        const taskManager = new TaskManager(i, task.title, task.description, task.dueDate);
        taskManager.save();

        categoryManager.tasks.push(task);
        categoryManager.save();
    }
}

export default createData;
