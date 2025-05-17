export interface ProjectList {
    id: string;
    name: string;
}

export type CreateProject = Omit<ProjectList, 'id'>

export interface ProjectProvider {
    openModal: boolean;
    handleOpen: (open:boolean) => void;
}