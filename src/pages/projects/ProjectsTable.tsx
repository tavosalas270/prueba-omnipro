import { TextField, InputAdornment, IconButton, Button, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import { useQueryClient } from '@tanstack/react-query';
import { ProjectList } from '../../interfaces';
import { useDeleteProject, useUpdateProject } from '../../hooks';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ModalUpdateProject } from '..';
import { useNavigate } from 'react-router';

export const ProjectsTable = () => {

    const navigate = useNavigate();

    const deleteStatus = useDeleteProject()

    const [value, setValue] = useState<ProjectList>({} as ProjectList);
    const [open, setOpen] = useState<boolean>(false);

    const updateStatus = useUpdateProject()

    const methods = useForm<ProjectList>({
        mode: "onChange",
        defaultValues: {
            id: value.id,
            name: value.name
        }
    });

    const {formState: {isValid}} = methods

    useEffect(() => {
        methods.setValue("id", value.id)
        methods.setValue("name", value.name)
    }, [value]);

    const queryClient = useQueryClient();

    const data = queryClient.getQueryData<ProjectList[]>(["projects-list"])

    const dataTable = data ?? []

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

    const handleOpenModal = (item:ProjectList) => {
        setOpen(!open)
        setValue(item)
    }

    const onSubmit = (data:ProjectList) => {
        setOpen(!open)
        updateStatus.mutate(data)
    }

    const handleViewDetails = (item:ProjectList) => {
        navigate(`/${item.id}`);
      };

  return (
    <div className="rounded-xl flex flex-col w-full h-[95%] bg-neutral-background p-2">
        <Dialog open={open} fullWidth>
            <FormProvider {...methods}>
                <DialogTitle className='flex justify-beetwen w-full items-center'>
                    <div className='w-[95%]'>
                        <p className='mb-0 font-semibold'>Actualizacion de Proyecto</p>
                    </div>
                    <div className='w-[5%]'>
                        <IconButton color="inherit" onClick={() => setOpen(!open)} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Para crear un nuevo proyecto debes darle un nombre
                    </DialogContentText>
                    <ModalUpdateProject />
                </DialogContent>
                <DialogActions>
                    <Button onClick={methods.handleSubmit(onSubmit)} disabled={!isValid} variant="outlined" sx={{width:"15%", fontWeight: 600, backgroundColor: "#00B261", color: "#FFF", border: "0", textTransform: "capitalize",
                "&:hover":{backgroundColor: "#08663B"}, "&:disabled": { backgroundColor: "transparent", color: "#d9d9d9", fontWeight: 400, border: "1", borderColor: "#d9d9d9" }}}>Actualizar</Button>
                </DialogActions>
            </FormProvider>
        </Dialog>
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