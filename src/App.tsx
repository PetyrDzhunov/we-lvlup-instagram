import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { ReactElement, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { routes } from './routes'

function App(): ReactElement | null {
    return (
        <Suspense
            fallback={
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CircularProgress color="info" size="2em" />
                </Box>
            }
        >
            <Routes>
                {routes.map((route) => (
                    <Route
                        path={route.path}
                        element={route.element}
                        key={route.key}
                    />
                ))}
            </Routes>
        </Suspense>
    )
}

export default App
