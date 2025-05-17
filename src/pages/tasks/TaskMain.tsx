import {useEffect, useContext, useState} from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { ProjectsTable, ModalCreateUpdateProject, TaskTable } from '..'
import { ProjectContext } from '../../contexts';
import { CreateProject, TaskList } from '../../interfaces';
import { useGetProjects, usePostProjects, useGetTasks } from '../../hooks';
import { showSwal } from '../../utils';
import Swal from 'sweetalert2';
import { useParams } from 'react-router';

export const TaskMain = () => {
  const { projectId } = useParams<{ projectId: string }>();
  useGetTasks(projectId ?? "")

  const [open, setOpen] = useState(false);

  const projectStatus = usePostProjects()

  return (
    <div className='w-full h-full flex items-center justify-center p-2'>
    <div className='w-[80%] h-[90%] flex flex-col gap-y-2'>
            <Button variant="outlined"
                sx={{ height:"5%", width:{xl:"15%", dosXl:"10%"},
                backgroundColor: "#00B261", color: "#FFF", border: "0", textTransform: "capitalize",
                "&:hover":{backgroundColor: "#08663B"}
            }}>Crear Tarea</Button>
            <TaskTable />
        </div>
    </div>
  )
}