import { TaskList, CreateTask, UpdateStatus } from "../interfaces"

const domain = import.meta.env.VITE_API_URL

export const getTasksByProjectId = async (projectId: string): Promise<TaskList[]> => {
    const response = await fetch(`${domain}/tasks?projectId=${projectId}&active=true`);
  
    if (!response.ok) {
      throw new Error("Error al obtener las tareas");
    }
  
    const tasks = await response.json();
    return tasks;
};

export const postTask = async (newTask: CreateTask): Promise<TaskList> => {
    const response = await fetch(`${domain}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...newTask,
        active: true
      })
    });
  
    if (!response.ok) {
      throw new Error('Error al crear la tarea');
    }
  
    const createdTask = await response.json();
    return createdTask;
};

export const patchTask = async (newTask: TaskList): Promise<TaskList> => {
    const response = await fetch(`${domain}/tasks/${newTask.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    });
  
    if (!response.ok) {
      throw new Error('Error al actualizar la tarea');
    }
  
    const updatedTask = await response.json();
    return updatedTask;
};

export const patchTaskStatus = async (data:UpdateStatus): Promise<TaskList> => {
  const response = await fetch(`${domain}/tasks/${data.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status: data.status })
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el estado de la tarea');
  }

  const updatedTask = await response.json();
  return updatedTask;
};

export const deleteTask = async (id: string): Promise<TaskList> => {
    const response = await fetch(`${domain}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ active: false })
    });
  
    if (!response.ok) {
      throw new Error('Error al desactivar la tarea');
    }
  
    const updatedTask = await response.json();
    return updatedTask;
  };