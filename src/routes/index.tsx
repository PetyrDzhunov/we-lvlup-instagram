import React from 'react'

const UploadPage = React.lazy(() => import('../pages/upload-page/UploadPage'))
const GuestPage = React.lazy(() => import('../pages/guest-page/GuestPage'))
const HomePage = React.lazy(() => import('../pages/home-page/HomePage'))

const RegisterPage = React.lazy(
    () => import('../pages/register-page/RegisterPage')
)

const ProfilePage = React.lazy(
    () => import('../pages/profile-page/ProfilePage')
)

const NotFoundPage = React.lazy(
    () => import('../pages/not-found-page/NotFoundPage')
)

interface Routes {
    path: string
    element: JSX.Element
    key: number
    authentication?: boolean
}

export const routes: Routes[] = [
    {
        path: '/',
        element: <GuestPage title="Login page" />,
        key: 1,
        authentication: false,
    },
    {
        path: '/home',
        element: <HomePage title="Home page" />,
        key: 2,
        authentication: true,
    },
    {
        path: '/register',
        element: <RegisterPage title="Register page" />,
        key: 3,
    },
    {
        path: '/profile',
        element: <ProfilePage title="Profile page" />,
        key: 4,
    },
    {
        path: '/upload',
        element: <UploadPage title="Upload page" />,
        key: 5,
    },
    {
        path: '/*',
        element: <NotFoundPage title="Not found page" />,
        key: 6,
    },
]
