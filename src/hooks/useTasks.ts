import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postTask, getTasksByProjectId, patchTask, deleteTask } from "../api";
import { TaskList, CreateEditTask } from "../interfaces";
import { showSwal } from "../utils";
import Swal from "sweetalert2";

interface DeleteTasks {
    id:string
    proyectId:string
}

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

export const usePostTasks = () => {
    const queryClient = useQueryClient();
    const projectState = useMutation({
        mutationFn: (data:CreateEditTask) => postTask(data),
        onMutate() {
            showSwal("info", "Creando Tarea")
        },
        onSuccess(data, variables) {
            queryClient.setQueryData<TaskList[]>(["tasks-list", variables.projectId], (old) => {
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

export const useUpdateTasks = () => {
    const queryClient = useQueryClient();
    const updateTaskState = useMutation({
        mutationFn: (data:CreateEditTask) => patchTask(data),
        onMutate() {
            showSwal("info", "Actualizando Tarea")
        },
        onSuccess(data,variables) {
            queryClient.setQueryData<TaskList[]>(["tasks-list", variables.projectId], (old) => {
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

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    const deleteTasksState = useMutation({
        mutationFn: (data:DeleteTasks) => deleteTask(data.id),
        onMutate() {
            showSwal("info", "Eliminando Tarea")
        },
        onSuccess(data, variables) {
            Swal.close();
            queryClient.setQueryData<TaskList[]>(["tasks-list", variables.proyectId], (old) =>
                old ? old.filter((p) => p.id !== data.id) : []
            );
            showSwal("success", "Tarea Eliminado", "El Tarea fue eliminado correctamente");
        }
    })

    return deleteTasksState
}