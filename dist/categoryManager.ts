import { Category } from './models.js';

class CategoryManager{
    category: Category[];

    constructor(private id: number, private title: string, private categoryClass: string, public tasks: { id: number; title: string; description: string; dueDate: Date; }[]) {
        this.category = [];

        const myLocalCategories = localStorage.getItem('categories');
        this.category = myLocalCategories ? JSON.parse(myLocalCategories) : [];
    }

    save(): void {
        // Create a new category and save it in localstorage
        const category: Category = {
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

    getCategoryById(id: number): Category {
        // Get a category by id
        return this.category.filter(category => category.id === id)[0];
    }

    static getCategoryByPriority(categories: Category[], priority: string): Category | undefined {
        // Get a category by priority
        return categories.find(category => category.categoryClass === priority);
    }
    

    getCategoryWithSpecificTask(taskId: number): Category | undefined {
        // Get a category by task id
        return this.category.find(category => category.tasks.some(task => task.id === taskId));
    }
}

export default CategoryManager