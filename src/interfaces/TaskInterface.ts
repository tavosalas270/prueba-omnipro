export interface TaskList {
    id: string;
    title: string;
    descripcion?: string; 
    endDate?: Date;
    status: string;
    priority: string;
    projectId: number;
}

export type CreateEditTask = Omit<TaskList, 'status'>