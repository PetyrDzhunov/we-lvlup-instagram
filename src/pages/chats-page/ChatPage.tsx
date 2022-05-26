import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks'
import PageLayout from '../../layout/PageLayout/PageLayout'
import { PageProps } from '../../types'
import UsersList from './UsersList'

function ChatPage({ title }: PageProps): JSX.Element {
    const navigate = useNavigate()
    const { isAuthenticated } = useAppSelector(
        (state) => state.persistedReducer.auth
    )

    useEffect(() => {
        if (!isAuthenticated) {
            return navigate('/')
        }
    }, [isAuthenticated, navigate])

    return (
        <PageLayout height="100%">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <UsersList />
        </PageLayout>
    )
}

export default ChatPage
