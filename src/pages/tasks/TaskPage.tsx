import {useState, useMemo} from 'react';
import { TaskContext } from '../../contexts';
import { ChildrenProp, Action, TaskProvider, CreateTask, TaskList } from '../../interfaces';

export const TaskPage = ({children}: ChildrenProp) => {
    
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [action, setAction] = useState<Action>("POST");
    const [valuesSelected, setValuesSelected] = useState<TaskList>({} as TaskList);

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
            handleOpen,
            handleAction,
            handleValuesSelected
        }),
        [openModal, action]
    );

    return (
        <TaskContext.Provider value={providerValue}>{children}</TaskContext.Provider>
    )
}