import {useContext} from 'react'
import { IconButton, Tooltip } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import { useQueryClient } from '@tanstack/react-query';
import { ProjectList } from '../../interfaces';
import { useDeleteProject } from '../../hooks';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { ProjectContext } from '../../contexts';

export const ProjectsTable = () => {

    const navigate = useNavigate();

    const deleteStatus = useDeleteProject()

    const queryClient = useQueryClient();

    const data = queryClient.getQueryData<ProjectList[]>(["projects-list"])

    const dataTable = data ?? []

    const {handleAction, handleOpen, handleValue, openModal} = useContext(ProjectContext)

    const handleDeleteProject = (id: string) => {
        Swal.fire({
          title: '¿Estás seguro?',
          text: 'Esta acción eliminará el proyecto permanentemente.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            deleteStatus.mutate(id);
          }
        });
    };

    const handleViewDetails = (item:ProjectList) => {
        navigate(`/${item.id}`);
    };

    const handleOpenModal = (item:ProjectList) => {
        handleAction("PUT")
        handleValue(item)
        handleOpen(!openModal)
    }

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
                                <p className="mb-0 text-center text-xs xl:text-sm 2xl:text-base 4xl:text-xl font-semibold">Detalles</p>
                            </th>
                            <th>
                                <p className="mb-0 text-center text-xs xl:text-sm 2xl:text-base 4xl:text-xl font-semibold">Acciones</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTable.map((item, index) => (
                            <tr key={item.id} className={`${index % 2 === 0 ? 'bg-neutral-background' : 'bg-neutral-200'}`}>
                                <td><p className="my-2 text-xs xl:text-sm 2xl:text-base 4xl:text-xl text-center">{item.name}</p></td>
                                <td>
                                    <div className='flex justify-center'>
                                        <Tooltip title="Ver Tareas de Proyecto">
                                            <IconButton className='!p-0' onClick={() => handleViewDetails(item)}>
                                                <RemoveRedEyeOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </td>
                                <td>
                                    <div className='flex justify-center gap-3'>
                                        <Tooltip title="Modificar Proyecto">
                                            <IconButton className='!p-0' onClick={() => handleOpenModal(item)}>
                                                <ModeEditOutlineOutlinedIcon sx={{color:"#5e8cff"}} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Eliminar Proyecto">
                                            <IconButton className='!p-0' onClick={() => handleDeleteProject(item.id)}>
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
                <p className='text-center font-semibold text-lg'>No hay proyectos aun</p>
            )}
        </div>
    </div>
  )
}