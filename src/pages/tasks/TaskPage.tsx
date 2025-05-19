import {useState, useMemo} from 'react';
import { TaskContext } from '../../contexts';
import { ChildrenProp, Action, TaskProvider, TaskList, Status } from '../../interfaces';

export const TaskPage = ({children}: ChildrenProp) => {
    
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [action, setAction] = useState<Action>("POST");
    const [valuesSelected, setValuesSelected] = useState<TaskList>({} as TaskList);
    const [statusFilter, setStatusFilter] = useState<Status>("");
    const [priorityFilter, setPriorityFilter] = useState("");

    const handlePriority = (value:string) => {
        setPriorityFilter(value);
    }

    const handleStatus = (value:Status) => {
        setStatusFilter(value);
    }

    const handleOpen = (open:boolean) => {
        setOpenModal(open);
    }

    const handleAction = (action:Action) => {
        setAction(action);
    }

    const handleValuesSelected = (values:TaskList) => {
        setValuesSelected(values);
    }

    const providerValue:TaskProvider = useMemo(
        () => ({
            openModal,
            action,
            valuesSelected,
            statusFilter,
            priorityFilter,
            handleOpen,
            handleAction,
            handleValuesSelected,
            handleStatus,
            handlePriority
        }),
        [openModal, action, valuesSelected, statusFilter, priorityFilter]
    );

    return (
        <TaskContext.Provider value={providerValue}>{children}</TaskContext.Provider>
    )
}