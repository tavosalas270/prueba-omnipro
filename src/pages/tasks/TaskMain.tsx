import { useEffect, useContext } from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { TaskTable, ModalCreateTask } from '..'
import { TaskContext } from '../../contexts';
import { CreateTask, TaskList } from '../../interfaces';
import { useGetTasks, usePostTasks, useUpdateTasks } from '../../hooks';
import { useParams } from 'react-router';
import { showSwal } from '../../utils';
import Swal from 'sweetalert2';

export const TaskMain = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const {isFetching, isSuccess, isError} = useGetTasks(projectId ?? "")

  const {handleOpen, handleAction, openModal, action, valuesSelected} = useContext(TaskContext)

  useEffect(() => {
    if (isFetching) {
      showSwal("info", "Cargando Tareas")
    } else if (isError) {
      showSwal("error", "Error", "No se pudo cargar las tareas, intenta mas tarde");
    } else if (isSuccess) {
      Swal.close()
    }
}, [isFetching, isSuccess, isError]);

  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];

  const methods = useForm<CreateTask>({
    mode: "onChange",
    defaultValues: {
      title: "",
      descripcion: "",
      endDate: formattedToday,
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
        <Button variant="outlined" onClick={() => handleOpenModal()}
            sx={{ height:"5%", width:{xl:"15%", dosXl:"10%"},
            backgroundColor: "#00B261", color: "#FFF", border: "0", textTransform: "capitalize",
            "&:hover":{backgroundColor: "#08663B"}
        }}>Crear Tarea</Button>
        <TaskTable />
      </div>
    </div>
  )
}