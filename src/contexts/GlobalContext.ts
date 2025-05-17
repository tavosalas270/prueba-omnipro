import { createContext } from "react";
import { GlobalProvider } from "../interfaces";

export const GlobalContext = createContext<GlobalProvider>({} as GlobalProvider);