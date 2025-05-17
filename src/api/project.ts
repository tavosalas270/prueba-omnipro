import { ProjectList, CreateProject } from "../interfaces";

const domain = import.meta.env.VITE_API_URL

export const getProjects = async (): Promise<ProjectList[]> => {
    const response = await fetch(`${domain}/projects?active=true`);
    if (!response.ok) {
      throw new Error("Error al obtener los proyectos");
    }
    const data = await response.json();
    return data as ProjectList[];
};

export const postProjects = async (newProject:CreateProject):Promise<ProjectList> => {
    const response = await fetch(`${domain}/projects`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...newProject,
          active: true
        })
    });

    if (!response.ok) {
        throw new Error("Error al crear el proyecto");
    }

    const createdProject = await response.json();
    return createdProject;
}

export const updateProject = async (project: ProjectList): Promise<ProjectList> => {
    const response = await fetch(`${domain}/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: project.name }),
    });
  
    if (!response.ok) {
      throw new Error("Error actualizando el proyecto");
    }
  
    return response.json();
};


export const deleteProject = async (id:string): Promise<ProjectList> => {
    const response = await fetch(`${domain}/projects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ active: false }),
    });
  
    if (!response.ok) {
      throw new Error("Error al eliminar el proyecto");
    }
  
    return response.json();
  };