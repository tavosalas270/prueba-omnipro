import {useState, useMemo} from 'react';
import { ProjectContext } from '../../contexts';
import { ChildrenProp, ProjectList, ProjectProvider, Action } from '../../interfaces';

export const ProjectsPage = ({children}: ChildrenProp) => {
    
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [action, setAction] = useState<Action>("POST");
    const [valueUpdate, setValueUpdate] = useState<ProjectList>({} as ProjectList);

    const handleValue = (value:ProjectList) => {
        setValueUpdate(value);
    }
    
    const handleAction = (action:Action) => {
        setAction(action);
    }

    const handleOpen = (open:boolean) => {
        setOpenModal(open);
    }

    const providerValue:ProjectProvider = useMemo(
        () => ({
            openModal,
            valueUpdate,
            action,
            handleOpen,
            handleValue,
            handleAction
        }),
        [openModal, valueUpdate, action]
    );

    return (
        <ProjectContext.Provider value={providerValue}>{children}</ProjectContext.Provider>
    )
}