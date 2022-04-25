import Box from '@mui/material/Box'
import { ReactElement, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import GuestPageFooter from './components/GuestPageFooter'
import { routes } from './routes'
import './styles/single-post.css'

function App(): ReactElement | null {
    return (
        <Suspense
            fallback={
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <img
                        className="single-post__image--small"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png"
                        alt="Instagram-logo"
                    />
                    <GuestPageFooter suspense />
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
