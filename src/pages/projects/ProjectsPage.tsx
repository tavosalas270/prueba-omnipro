import {useState, useMemo} from 'react';
import { ProjectContext } from '../../contexts';
import { ChildrenProp, ProjectList, ProjectProvider } from '../../interfaces';

export const ProjectsPage = ({children}: ChildrenProp) => {
    
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [valueUpdate, setValueUpdate] = useState<ProjectList>({} as ProjectList);

    const handleValue = (value:ProjectList) => {
        setValueUpdate(value);
    }

    const handleOpen = (open:boolean) => {
        setOpenModal(open);
    }

    const providerValue:ProjectProvider = useMemo(
        () => ({
            openModal,
            valueUpdate,
            handleOpen,
            handleValue
        }),
        [openModal, valueUpdate]
    );

    return (
        <ProjectContext.Provider value={providerValue}>{children}</ProjectContext.Provider>
      )
}