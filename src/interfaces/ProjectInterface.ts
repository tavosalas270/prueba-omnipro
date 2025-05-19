import { Action } from ".";

export interface ProjectList {
    id: string;
    name: string;
}

export type CreateProject = Omit<ProjectList, 'id'>

export interface ProjectProvider {
    openModal: boolean;
    handleOpen: (open:boolean) => void;
    action: Action;
    handleAction: (action:Action) => void;
    valueUpdate: ProjectList;
    handleValue: (values:ProjectList) => void;
}