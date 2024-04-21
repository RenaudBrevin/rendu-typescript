export interface Task{
    id: number;
    title: string;
    description: string;
    dueDate: Date;
}

export interface Category{
    id: number;
    title: string;
    categoryClass: string;
    tasks: Task[];
}
