import { lazy } from 'react'
import ChatRoomPage from '../pages/chat-room-page/ChatRoomPage'
import ChatPage from '../pages/chats-page/ChatPage'

const UploadPage = lazy(() => import('../pages/upload-page/UploadPage'))
const MainPage = lazy(() => import('../pages/main-page/MainPage'))
const RegisterPage = lazy(() => import('../pages/register-page/RegisterPage'))
const ProfilePage = lazy(() => import('../pages/profile-page/ProfilePage'))
const NotFoundPage = lazy(() => import('../pages/not-found-page/NotFoundPage'))
const PostPage = lazy(() => import('../pages/post-page/PostPage'))

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
        path: '/profile/:userID',
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
        key: 6,
    },
    {
        path: '/chats',
        element: <ChatPage title="Chats page" />,
        key: 7,
    },
    {
        path: '/chats/:chatRoomID',
        element: <ChatRoomPage title="Chat page" />,
        key: 8,
    },
    {
        path: '/*',
        element: <NotFoundPage title="Not found page" />,
        key: 9,
    },
]
