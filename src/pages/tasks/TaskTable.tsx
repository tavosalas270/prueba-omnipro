import { TextField, InputAdornment, IconButton, Button, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import { useQueryClient } from '@tanstack/react-query';
import { ProjectList, TaskList } from '../../interfaces';
import { useDeleteProject, useUpdateProject } from '../../hooks';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ModalUpdateProject } from '..';
import { useParams } from 'react-router';

export const TaskTable = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData<TaskList[]>(["tasks-list", projectId])
    const dataTable = data ?? []
  return (
    <div className="rounded-xl flex flex-col w-full h-[95%] bg-neutral-background p-2">
        <div className='rounded-b-xl h-full w-full overflow-y-auto'>
            {dataTable.length > 0 ? (
                <table className='w-full'>
                    <thead className='bg-neutral-background z-50 sticky top-0'>
                        <tr>
                            <th>
                                <p className="mb-0 text-center text-xs xl:text-sm 2xl:text-base 4xl:text-xl font-semibold">Nombre</p>
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
                                <td>
                                    <div className='flex justify-center gap-3'>
                                        <Tooltip title="Modificar Tarea">
                                            <IconButton className='!p-0' >
                                                <ModeEditOutlineOutlinedIcon sx={{color:"#5e8cff"}} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Eliminar Tarea">
                                            <IconButton className='!p-0' >
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