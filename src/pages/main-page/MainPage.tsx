import { lazy } from 'react'
import { useAppSelector } from '../../hooks/redux-hooks'

const GuestPage = lazy(() => import('../guest-page/GuestPage'))
const HomePage = lazy(() => import('../home-page/HomePage'))

function MainPage(): JSX.Element {
    const isAuthenticated = useAppSelector(
        (state) => state.persistedReducer.auth.isAuthenticated
    )
    return (
        <>
            {isAuthenticated && (
                <HomePage
                    title={isAuthenticated ? 'Home Page' : 'Login Page'}
                />
            )}
            {!isAuthenticated && (
                <GuestPage
                    title={isAuthenticated ? 'Home Page' : 'Login Page'}
                />
            )}
        </>
    )
}

export default MainPage
