import GuestPage from '../pages/guest-page/GuestPage'
import HomePage from '../pages/home-page/HomePage'
import NotFoundPage from '../pages/not-found-page/NotFoundPage'
import ProfilePage from '../pages/profile-page/ProfilePage'
import RegisterPage from '../pages/register-page/RegisterPage'
import UploadPage from '../pages/upload-page/UploadPage'

interface Routes {
    path: string
    element: JSX.Element
    key: number
    authentication?: boolean
}

export const routes: Routes[] = [
    { path: '/', element: <GuestPage />, key: 1, authentication: false },
    { path: '/home', element: <HomePage />, key: 2, authentication: true },
    { path: '/register', element: <RegisterPage />, key: 3 },
    { path: '/profile', element: <ProfilePage />, key: 4 },
    { path: '/upload', element: <UploadPage />, key: 5 },
    { path: '/*', element: <NotFoundPage />, key: 6 },
]
