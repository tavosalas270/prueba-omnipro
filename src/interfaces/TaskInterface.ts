export type Status = "Pendiente" | "Completada" | ""
export type Action = "POST" | "PUT"

export interface UpdateStatus {
    id:string;
    status: Status
}

export interface TaskList {
    id: string;
    title: string;
    descripcion?: string; 
    endDate?: string;
    status: Status;
    priority: string;
    projectId: string;
}

export type CreateTask = Omit<TaskList, 'id'>

export interface TaskProvider {
    openModal: boolean;
    handleOpen: (open:boolean) => void;
    action: Action;
    handleAction: (action:Action) => void;
    valuesSelected: TaskList;
    handleValuesSelected: (values:TaskList) => void;
    statusFilter: Status;
    handleStatus: (values:Status) => void;
    priorityFilter: string;
    handlePriority: (values:string) => void;
}