import { ReactElement, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import FlexBoxRowCentered from './components/FlexBoxCentered'
import GuestPageFooter from './components/OptionalLogin/GuestPageFooter'
import { useAppSelector } from './hooks/redux-hooks'
import { routes } from './routes'
import './styles/single-post.css'

function App(): ReactElement | null {
    const theme = useAppSelector((state) => state.persistedReducer.auth.theme)
    const backgroundColor = theme === 'dark' ? '#121212' : '#FFFFFF'
    return (
        <Suspense
            fallback={
                <FlexBoxRowCentered
                    sx={{
                        height: '100vh',
                        backgroundColor: { backgroundColor },
                    }}
                >
                    <img
                        className="single-post__image--small"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png"
                        alt="Instagram-logo"
                    />
                    <GuestPageFooter suspense />
                </FlexBoxRowCentered>
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
