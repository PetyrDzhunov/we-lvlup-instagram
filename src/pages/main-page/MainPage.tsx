import React from 'react'
import { useAppSelector } from '../../hooks/redux-hooks'

const GuestPage = React.lazy(() => import('../guest-page/GuestPage'))
const HomePage = React.lazy(() => import('../home-page/HomePage'))

function MainPage(): JSX.Element {
    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
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
