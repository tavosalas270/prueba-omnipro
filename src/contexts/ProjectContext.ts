import { createContext } from "react";
import { ProjectProvider } from "../interfaces";

export const ProjectContext = createContext<ProjectProvider>({} as ProjectProvider);