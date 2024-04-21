class CategoryManager {
    constructor(id, title, categoryClass, tasks) {
        this.id = id;
        this.title = title;
        this.categoryClass = categoryClass;
        this.tasks = tasks;
        this.category = [];
        const myLocalCategories = localStorage.getItem('categories');
        this.category = myLocalCategories ? JSON.parse(myLocalCategories) : [];
    }
    save() {
        // Create a new category and save it in localstorage
        const category = {
            id: this.id,
            title: this.title,
            categoryClass: this.categoryClass,
            tasks: this.tasks
        };
        this.category.push(category);
        localStorage.setItem('categories', JSON.stringify(this.category));
    }
    //getCategories(): Category[] {
    // Get categories from localstorage
    //    return this.category;
    //}
    getCategoryById(id) {
        // Get a category by id
        return this.category.filter(category => category.id === id)[0];
    }
    static getCategoryByPriority(categories, priority) {
        // Get a category by priority
        return categories.find(category => category.categoryClass === priority);
    }
    getCategoryWithSpecificTask(taskId) {
        // Get a category by task id
        return this.category.find(category => category.tasks.some(task => task.id === taskId));
    }
}
export default CategoryManager;
