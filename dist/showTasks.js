function showTasksFromCategories(categories) {
    const taskContainer = document.getElementById('tasks');
    taskContainer.innerHTML = '';
    categories.forEach((category) => {
        category.tasks.forEach((task) => {
            taskContainer.innerHTML += `
            <div class="task ${category.categoryClass}" id="${task.id}">
                <h3>${task.title} <span>- Priorité ${category.title}</span></h3>
                <p>Date d'échéance: ${new Date(String(task.dueDate)).toISOString().split('T')[0]}</p>
                <p>${task.description}</p>
                <button class="delete-btn">Supprimer</button>
                <button class="edit-btn">Modifier</button>
            </div>
            `;
        });
    });
}
function showTasksWithFilter(categories, priority, dueDate) {
    // Show tasks with filter. Filter by priority and due date. If task's due date if less or equal to the selected date, show the task.
    const taskContainer = document.getElementById('tasks');
    if (priority === 'all' && dueDate === '') {
        showTasksFromCategories(categories);
        return;
    }
    else if (dueDate === '') {
        dueDate = '9999-12-31'; // If no date is selected don't sort by date
    }
    taskContainer.innerHTML = '';
    categories.forEach((category) => {
        category.tasks.forEach((task) => {
            const taskDueDate = new Date(String(task.dueDate)).toISOString().split('T')[0];
            if (taskDueDate <= dueDate && priority === 'all') {
                taskContainer.innerHTML += `
                    <div class="task ${category.categoryClass}" id="${task.id}">
                        <h3>${task.title} <span>- Priorité ${category.title}</span></h3>
                        <p>Date d'échéance: ${taskDueDate}</p>
                        <p>${task.description}</p>
                        <button class="delete-btn">Supprimer</button>
                        <button class="edit-btn">Modifier</button>
                    </div>
                    `;
            }
            else if (taskDueDate <= dueDate && category.categoryClass === priority) {
                taskContainer.innerHTML += `
                    <div class="task ${category.categoryClass}" id="${task.id}">
                        <h3>${task.title} <span>- Priorité ${category.title}</span></h3>
                        <p>Date d'échéance: ${taskDueDate}</p>
                        <p>${task.description}</p>
                        <button class="delete-btn">Supprimer</button>
                        <button class="edit-btn">Modifier</button>
                    </div>
                    `;
            }
        });
    });
}
function showTaskWithSearchBar(categories, search) {
    // Show tasks with filter. Filter by priority and due date. If task's due date if less or equal to the selected date, show the task.
    const taskContainer = document.getElementById('tasks');
    taskContainer.innerHTML = '';
    categories.forEach((category) => {
        category.tasks.forEach((task) => {
            const lowercaseSearch = search.toLowerCase();
            const lowercaseTitle = task.title.toLowerCase();
            const lowercaseDescription = task.description.toLowerCase();
            if (lowercaseTitle.includes(lowercaseSearch) || lowercaseDescription.includes(lowercaseSearch)) {
                taskContainer.innerHTML += `
                <div class="task ${category.categoryClass}" id="${task.id}">
                    <h3>${task.title} <span>- Priorité ${category.title}</span></h3>
                    <p>Date d'échéance: ${new Date(String(task.dueDate)).toISOString().split('T')[0]}</p>
                    <p>${task.description}</p>
                    <button class="delete-btn">Supprimer</button>
                    <button class="edit-btn">Modifier</button>
                </div>
                `;
            }
        });
    });
}
export { showTasksFromCategories, showTasksWithFilter, showTaskWithSearchBar };
