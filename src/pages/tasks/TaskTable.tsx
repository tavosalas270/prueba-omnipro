import { IconButton, Tooltip, Switch } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import { useQueryClient } from '@tanstack/react-query';
import { TaskList, UpdateStatus } from '../../interfaces';
import { useDeleteTask, useUpdateTaskStatus } from '../../hooks';
import { useContext } from 'react';
import { TaskContext } from '../../contexts';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';

export const TaskTable = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData<TaskList[]>(["tasks-list", projectId])

    const {openModal, statusFilter, priorityFilter, handleOpen, handleAction, handleValuesSelected} = useContext(TaskContext)
    
    const dataTable = (data ?? []).filter((item) => statusFilter !== "" ? item.status === statusFilter : true)
    .filter((item) => priorityFilter !== "" ? item.priority === priorityFilter : true)

    const handleSelect = (item:TaskList) => {
        handleAction("PUT")
        handleValuesSelected(item)
        handleOpen(!openModal)
    }

    const deleteTaskStatus = useDeleteTask(projectId ?? "")
    const updateStatusTask = useUpdateTaskStatus(projectId ?? "")

    const handleDeleteTask = (id: string) => {
        Swal.fire({
          title: '¿Estás seguro?',
          text: 'Esta acción eliminará la tarea permanentemente.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            deleteTaskStatus.mutate(id)
          }
        });
    };

    const handleUpdateStatus = (item:TaskList) => {
        const data:UpdateStatus = {
            id: item.id,
            status: item.status === "Completada" ? "Pendiente" : "Completada"
        }
        updateStatusTask.mutate(data)
    }

  return (
    <div className="rounded-xl flex flex-col w-full h-[95%] bg-neutral-background p-2">
        <div className='rounded-b-xl h-full w-full overflow-y-auto'>
            {dataTable.length > 0 ? (
                <table className='w-full'>
                    <thead className='bg-neutral-background z-50 sticky top-0'>
                        <tr>
                            <th>
                                <p className="mb-0 text-center text-xs xl:text-sm 2xl:text-base 4xl:text-xl font-semibold">Título</p>
                            </th>
                            <th>
                                <p className="mb-0 text-center text-xs xl:text-sm 2xl:text-base 4xl:text-xl font-semibold">Descripción</p>
                            </th>
                            <th>
                                <p className="mb-0 text-center text-xs xl:text-sm 2xl:text-base 4xl:text-xl font-semibold">Fecha de vencimiento</p>
                            </th>
                            <th>
                                <p className="mb-0 text-center text-xs xl:text-sm 2xl:text-base 4xl:text-xl font-semibold">Estado</p>
                            </th>
                            <th>
                                <p className="mb-0 text-center text-xs xl:text-sm 2xl:text-base 4xl:text-xl font-semibold">Prioridad</p>
                            </th>
                            <th>
                                <p className="mb-0 text-center text-xs xl:text-sm 2xl:text-base 4xl:text-xl font-semibold">Acciones</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTable.map((item, index) => (
                            <tr key={item.id} className={`${index % 2 === 0 ? 'bg-neutral-background' : 'bg-neutral-200'}`}>
                                <td><p className="my-2 text-xs xl:text-sm 2xl:text-base 4xl:text-xl text-center">{item.title}</p></td>
                                <td><p className="my-2 text-xs xl:text-sm 2xl:text-base 4xl:text-xl text-center">{item.descripcion}</p></td>
                                <td><p className="my-2 text-xs xl:text-sm 2xl:text-base 4xl:text-xl text-center">{item.endDate}</p></td>
                                <td>
                                    <div className="flex items-center justify-center gap-2">
                                        <Switch
                                            checked={item.status === "Pendiente"}
                                            onChange={() => handleUpdateStatus(item)}
                                            color="primary"
                                        />
                                        <span className="text-xs xl:text-sm 2xl:text-base 4xl:text-xl">
                                            {item.status}
                                        </span>
                                    </div>
                                </td>
                                <td><p className="my-2 text-xs xl:text-sm 2xl:text-base 4xl:text-xl text-center capitalize">{item.priority}</p></td>
                                <td>
                                    <div className='flex justify-center gap-3'>
                                        <Tooltip title="Modificar Tarea">
                                            <IconButton className='!p-0' onClick={() => handleSelect(item)}>
                                                <ModeEditOutlineOutlinedIcon sx={{color:"#5e8cff"}} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Eliminar Tarea">
                                            <IconButton className='!p-0' onClick={() => handleDeleteTask(item.id)}>
                                                <BlockOutlinedIcon sx={{color:"#C92323"}} />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className='text-center font-semibold text-lg'>No hay tareas aun</p>
            )}
        </div>
    </div>
  )
}