import { useEffect, useContext } from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { TaskTable, ModalCreateTask } from '..'
import { TaskContext } from '../../contexts';
import { CreateTask, TaskList, Status } from '../../interfaces';
import { useGetTasks, usePostTasks, useUpdateTasks } from '../../hooks';
import { useParams } from 'react-router';
import { showSwal } from '../../utils';
import Swal from 'sweetalert2';

export const TaskMain = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const {isFetching, isSuccess, isError} = useGetTasks(projectId ?? "")

  const {handleOpen, handleAction, handleStatus, handlePriority, openModal, action, valuesSelected} = useContext(TaskContext)

  useEffect(() => {
    if (isFetching) {
      showSwal("info", "Cargando Tareas")
    } else if (isError) {
      showSwal("error", "Error", "No se pudo cargar las tareas, intenta mas tarde");
    } else if (isSuccess) {
      Swal.close()
    }
  }, [isFetching, isSuccess, isError]);

  const methods = useForm<CreateTask>({
    mode: "onChange",
    defaultValues: {
      title: "",
      descripcion: "",
      endDate: "",
      status: "Pendiente",
      priority: "",
      projectId: projectId
    }
  });

  const {formState: {isValid}} = methods

  useEffect(() => {
    if (action === "PUT") {
      methods.setValue("title", valuesSelected.title)
      methods.setValue("descripcion", valuesSelected.descripcion)
      methods.setValue("endDate", valuesSelected.endDate)
      methods.setValue("status", valuesSelected.status)
      methods.setValue("priority", valuesSelected.priority)
    } else {
      methods.reset()
    }
  }, [action, valuesSelected]);

  const createTaskStatus = usePostTasks(projectId ?? "")
  const updateTaskStatus = useUpdateTasks(projectId ?? "")

  const onSubmit = (data:CreateTask) => {
    handleOpen(!openModal)
    if (action === "POST") {
      createTaskStatus.mutate(data)
    } else {
      const dataUpdate:TaskList = {
        id: valuesSelected.id,
        title: data.title,
        descripcion: data.descripcion,
        endDate: data.endDate,
        priority: data.priority,
        status: valuesSelected.status,
        projectId: data.projectId,
      }
      updateTaskStatus.mutate(dataUpdate)
    }
    methods.reset()
  }

  const handleOpenModal = () => {
    handleAction("POST")
    handleOpen(!openModal)
  }

  return (
    <div className='w-full h-full flex items-center justify-center p-2'>
      <Dialog open={openModal} fullWidth>
        <FormProvider {...methods}>
          <DialogTitle className='flex justify-beetwen w-full items-center'>
            <div className='w-[95%]'>
              <p className='mb-0 font-semibold'>{action === "POST" ? "Creación" : "Actualización"} de Tarea</p>
            </div>
            <div className='w-[5%]'>
              <IconButton color="inherit" onClick={() => handleOpen(!openModal)} aria-label="close">
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent>
            <ModalCreateTask />
          </DialogContent>
          <DialogActions>
            <Button onClick={methods.handleSubmit(onSubmit)} disabled={!isValid} variant="outlined" sx={{width:`${action === "POST" ? "10%" : "15%"}`, fontWeight: 600, backgroundColor: "#00B261", color: "#FFF", border: "0", textTransform: "capitalize",
            "&:hover":{backgroundColor: "#08663B"}, "&:disabled": { backgroundColor: "transparent", color: "#d9d9d9", fontWeight: 400, border: "1", borderColor: "#d9d9d9" }}}>{action === "POST" ? "Crear" : "Actualizar"}</Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
      <div className='w-[80%] h-[90%] flex flex-col gap-y-2'>
        <div className='w-full flex justify-between h-[8%]'>
          <Button variant="outlined" onClick={() => handleOpenModal()}
              sx={{ height:"85%", width:{xl:"15%", dosXl:"10%"},
              backgroundColor: "#00B261", color: "#FFF", border: "0", textTransform: "capitalize",
              "&:hover":{backgroundColor: "#08663B"}
          }}>Crear Tarea</Button>
          <div className='h-full w-[80%] flex justify-end gap-4'>
          <TextField
              select
              label="Estado"
              variant="outlined"
              sx={{width:"12%"}}
              onChange={(e) => handleStatus(e.target.value as Status)}
            >
              <MenuItem value="">Selecciona un estado</MenuItem>
              <MenuItem value="Completada">Completada</MenuItem>
              <MenuItem value="Pendiente">Pendiente</MenuItem>
            </TextField>
            <TextField
              select
              label="Prioridad"
              variant="outlined"
              sx={{width:"10%"}}
              onChange={(e) => handlePriority(e.target.value)}
            >
              <MenuItem value="">Selecciona una prioridad</MenuItem>
              <MenuItem value="baja">Baja</MenuItem>
              <MenuItem value="media">Media</MenuItem>
              <MenuItem value="alta">Alta</MenuItem>
            </TextField>
          </div>
          
        </div>
        <TaskTable />
      </div>
    </div>
  )
}