import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postTask, getTasksByProjectId, patchTask, deleteTask, patchTaskStatus } from "../api";
import { TaskList, CreateTask, UpdateStatus } from "../interfaces";
import { showSwal } from "../utils";
import Swal from "sweetalert2";

export const useGetTasks = (projectId:string) => {
    const taskStateInitial = useQuery({
        queryKey: ["tasks-list", projectId],
        queryFn: () => getTasksByProjectId(projectId),
        retry: false,
        staleTime: 1000 * 60 * 60 * 24,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: projectId !== ""
    })

    return taskStateInitial
}

export const usePostTasks = (projectId:string) => {
    const queryClient = useQueryClient();
    const projectState = useMutation({
        mutationFn: (data:CreateTask) => postTask(data),
        onMutate() {
            showSwal("info", "Creando Tarea")
        },
        onSuccess(data) {
            queryClient.setQueryData<TaskList[]>(["tasks-list", projectId], (old) => {
                return old ? [...old, data] : [data];
            });
            showSwal("success", "Tarea creada", "La tarea fue añadida correctamente");
        },
        onError() {
            showSwal("error", "Error", "No se pudo crear la tarea");
        }
    })

    return projectState
}

export const useUpdateTasks = (projectId:string) => {
    const queryClient = useQueryClient();
    const updateTaskState = useMutation({
        mutationFn: (data:TaskList) => patchTask(data),
        onMutate() {
            showSwal("info", "Actualizando Tarea")
        },
        onSuccess(data) {
            queryClient.setQueryData<TaskList[]>(["tasks-list", projectId], (old) => {
                return old ? old.map((p) => (p.id === data.id ? data : p)) : [];
            });
            showSwal("success", "Tarea actualizado", "El tarea fue actualizado correctamente");
        },
        onError() {
            showSwal("error", "Error", "No se pudo actualizar el tarea");
        }
    })

    return updateTaskState
}

export const useUpdateTaskStatus = (projectId:string) => {
    const queryClient = useQueryClient();
    const updateTaskState = useMutation({
        mutationFn: (data:UpdateStatus) => patchTaskStatus(data),
        onSuccess(data) {
            queryClient.setQueryData<TaskList[]>(["tasks-list", projectId], (old) => {
                return old ? old.map((p) => (p.id === data.id ? data : p)) : [];
            });
        },
        onError() {
            showSwal("error", "Error", "No se pudo actualizar el estado de tarea");
        }
    })

    return updateTaskState
}

export const useDeleteTask = (projectId:string) => {
    const queryClient = useQueryClient();
    const deleteTasksState = useMutation({
        mutationFn: (id:string) => deleteTask(id),
        onMutate() {
            showSwal("info", "Eliminando Tarea")
        },
        onSuccess(data) {
            Swal.close();
            queryClient.setQueryData<TaskList[]>(["tasks-list", projectId], (old) =>
                old ? old.filter((p) => p.id !== data.id) : []
            );
            showSwal("success", "Tarea Eliminado", "El Tarea fue eliminado correctamente");
        }
    })

    return deleteTasksState
}