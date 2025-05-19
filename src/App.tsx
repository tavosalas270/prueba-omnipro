import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material';
import './App.css'
import { MainPage } from "./MainPage";
import { ProjectsMain, ProjectsPage, TaskPage, TaskMain } from "./pages";

const queryClient = new QueryClient()

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    dosXl: true;
    tresXl: true;
    cuatroXl: true;
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      dosXl: 1440,
      tresXl: 1536,
      cuatroXl: 2560
    },
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <MainPage>
            <ProjectsPage>
              <TaskPage>
                <Routes>
                  <Route path="/" element={<ProjectsMain />} />
                  <Route path="/:projectId" element={<TaskMain />} />
                </Routes>
              </TaskPage>
            </ProjectsPage>
          </MainPage>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
