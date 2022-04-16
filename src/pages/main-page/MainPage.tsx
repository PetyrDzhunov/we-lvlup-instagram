import HomePage from '../home-page/HomePage'
import GuestPage from '../guest-page/GuestPage'
import { useAppSelector } from '../../hooks/redux-hooks'

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
