import React from 'react'

const UploadPage = React.lazy(() => import('../pages/upload-page/UploadPage'))
const MainPage = React.lazy(() => import('../pages/main-page/MainPage'))

const RegisterPage = React.lazy(
    () => import('../pages/register-page/RegisterPage')
)

const ProfilePage = React.lazy(
    () => import('../pages/profile-page/ProfilePage')
)

const NotFoundPage = React.lazy(
    () => import('../pages/not-found-page/NotFoundPage')
)

const PostPage = React.lazy(() => import('../pages/post-page/PostPage'))

interface Routes {
    path: string
    element: JSX.Element
    key: number
}

export const routes: Routes[] = [
    {
        path: '/',
        element: <MainPage />,
        key: 1,
    },
    {
        path: '/',
        element: <MainPage />,
        key: 2,
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
        path: `/posts/:postID`,
        element: <PostPage title="Post page" />,
        key: 5,
    },
    {
        path: '/*',
        element: <NotFoundPage title="Not found page" />,
        key: 6,
    },
]
