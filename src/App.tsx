import { ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { routes } from './routes'

function App(): ReactElement | null {
    return (
        <Routes>
            {routes.map((route) => (
                <Route
                    path={route.path}
                    element={route.element}
                    key={route.key}
                />
            ))}
        </Routes>
    )
}

export default App
