import Box from '@mui/material/Box'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks'
import PageLayout from '../../layout/PageLayout/PageLayout'
import { PageProps } from '../../types'

function HomePage({ title }: PageProps): JSX.Element {
    const navigate = useNavigate()

    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
    )

    useEffect(() => {
        if (!isAuthenticated) {
            return navigate('/')
        }
    }, [isAuthenticated, navigate])

    return (
        <PageLayout>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Box>
                Home Page
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
            </Box>
        </PageLayout>
    )
}

export default HomePage
