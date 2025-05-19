import {useEffect, useContext} from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { ProjectsTable, ModalCreateUpdateProject } from '..'
import { ProjectContext } from '../../contexts';
import { CreateProject, ProjectList } from '../../interfaces';
import { useGetProjects, usePostProjects, useUpdateProject } from '../../hooks';
import { showSwal } from '../../utils';
import Swal from 'sweetalert2';


export const ProjectsMain = () => {

    const {isFetching, isSuccess, isError} = useGetProjects()

    const {openModal, valueUpdate, action, handleOpen} = useContext(ProjectContext)

    useEffect(() => {
        if (isFetching) {
            showSwal("info", "Cargando Proyectos")
        } else if (isError) {
            showSwal("error", "Error", "No se pudo cargar los proyectos, intenta mas tarde");
        } else if (isSuccess) {
            Swal.close()
        }
    }, [isFetching, isSuccess, isError]);

    const projectStatus = usePostProjects()
    const updateProjectStatus = useUpdateProject()

    const methods = useForm<CreateProject>({
        mode: "onChange",
        defaultValues: {
          name: ""
        }
    });

    const {formState: {isValid}} = methods

    useEffect(() => {
        if (action === "PUT") {
          methods.setValue("name", valueUpdate.name)
        } else {
          methods.reset()
        }
    }, [action, valueUpdate]);

    const onSubmit = (data:CreateProject) => {
        handleOpen(!openModal)
        if (action === "POST") {
            projectStatus.mutate(data)
        } else {
            const dataUpdate:ProjectList = {
                id: valueUpdate.id,
                name:data.name
            }
            updateProjectStatus.mutate(dataUpdate)
        }
        methods.reset()
    }

  return (
    <div className='w-full h-full flex items-center justify-center p-2'>
        <Dialog open={openModal} fullWidth>
            <FormProvider {...methods}>
                <DialogTitle className='flex justify-beetwen w-full items-center'>
                    <div className='w-[95%]'>
                        <p className='mb-0 font-semibold'>Creación de Proyecto</p>
                    </div>
                    <div className='w-[5%]'>
                        <IconButton color="inherit" onClick={() => handleOpen(!openModal)} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Para crear un nuevo proyecto debes darle un nombre
                    </DialogContentText>
                    <ModalCreateUpdateProject />
                </DialogContent>
                <DialogActions>
                    <Button onClick={methods.handleSubmit(onSubmit)} disabled={!isValid} variant="outlined" sx={{width:"10%", fontWeight: 600, backgroundColor: "#00B261", color: "#FFF", border: "0", textTransform: "capitalize",
                "&:hover":{backgroundColor: "#08663B"}, "&:disabled": { backgroundColor: "transparent", color: "#d9d9d9", fontWeight: 400, border: "1", borderColor: "#d9d9d9" }}}>Crear</Button>
                </DialogActions>
            </FormProvider>
        </Dialog>
        <div className='w-[80%] h-[90%] flex flex-col gap-y-2'>
            <Button variant="outlined" onClick={() => handleOpen(!openModal)}
                sx={{ height:"5%", width:{xl:"15%", dosXl:"10%"},
                backgroundColor: "#00B261", color: "#FFF", border: "0", textTransform: "capitalize",
                "&:hover":{backgroundColor: "#08663B"}
            }}>Crear Proyecto</Button>
            <ProjectsTable />
        </div>
    </div>
  )
}