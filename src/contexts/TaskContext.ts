import { createContext } from "react";
import { TaskProvider } from "../interfaces";

export const TaskContext = createContext<TaskProvider>({} as TaskProvider);