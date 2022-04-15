import HomePage from '../home-page/HomePage'
import GuestPage from '../guest-page/GuestPage'
import { PageProps } from '../../types'
import { useAppSelector } from '../../hooks/redux-hooks'

function MainPage({ title }: PageProps): JSX.Element {
    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
    )
    console.log(isAuthenticated)

    return (
        <>
            {isAuthenticated && <HomePage title={title} />}
            {!isAuthenticated && <GuestPage title={title} />}
        </>
    )
}

export default MainPage
