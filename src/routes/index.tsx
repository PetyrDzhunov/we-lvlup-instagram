import GuestPage from '../pages/guest-page/GuestPage'
import RegisterPage from '../pages/register-page/RegisterPage'

interface Routes {
    path: string
    element: JSX.Element
    key: number
    authentication?: boolean
}

export const routes: Routes[] = [
    { path: '/', element: <GuestPage />, key: 1, authentication: false },
    { path: '/register', element: <RegisterPage />, key: 2 },
]
