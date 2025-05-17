import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects, postProjects, updateProject, deleteProject } from "../api";
import { ProjectList, CreateProject } from "../interfaces";
import { showSwal } from "../utils";
import Swal from "sweetalert2";

export const useGetProjects = () => {
    const projectStateInitial = useQuery({
        queryKey: ["projects-list"],
        queryFn: getProjects,
        retry: false,
        staleTime: 1000 * 60 * 60 * 24,
        refetchOnMount: false,
        refetchOnWindowFocus: false 
    })

    return projectStateInitial
}

export const usePostProjects = () => {
    const queryClient = useQueryClient();
    const projectState = useMutation({
        mutationFn: (data:CreateProject) => postProjects(data),
        onMutate() {
            showSwal("info", "Creando Proyecto")
        },
        onSuccess(data) {
            queryClient.setQueryData<ProjectList[]>(["projects-list"], (old) => {
                return old ? [...old, data] : [data];
            });
            showSwal("success", "Proyecto creado", "El proyecto fue añadido correctamente");
        },
        onError() {
            showSwal("error", "Error", "No se pudo crear el proyecto");
        }
    })

    return projectState
}

export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    const updateProjectState = useMutation({
        mutationFn: (data:ProjectList) => updateProject(data),
        onMutate() {
            showSwal("info", "Actualizando Proyecto")
        },
        onSuccess(data) {
            queryClient.setQueryData<ProjectList[]>(["projects-list"], (old) => {
                return old ? old.map((p) => (p.id === data.id ? data : p)) : [];
            });
            showSwal("success", "Proyecto actualizado", "El proyecto fue actualizado correctamente");
        },
        onError() {
            showSwal("error", "Error", "No se pudo crear el proyecto");
        }
    })

    return updateProjectState
}

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    const deleteProjectState = useMutation({
        mutationFn: (id:string) => deleteProject(id),
        onMutate() {
            showSwal("info", "Eliminando Proyecto")
        },
        onSuccess(data) {
            Swal.close();
            queryClient.setQueryData<ProjectList[]>(["projects-list"], (old) =>
                old ? old.filter((p) => p.id !== data.id) : []
            );
            showSwal("success", "Proyecto Eliminado", "El proyecto fue eliminado correctamente");
        }
    })

    return deleteProjectState
}