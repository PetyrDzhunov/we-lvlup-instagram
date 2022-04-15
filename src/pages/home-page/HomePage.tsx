import Box from '@mui/material/Box'
import { Helmet } from 'react-helmet'
import { useAppSelector } from '../../hooks/redux-hooks'
import PageLayout from '../../layout/PageLayout/PageLayout'
import { RootState } from '../../store'
import { PageProps } from '../../types'

function HomePage({ title }: PageProps): JSX.Element {
    const isAuthenticated = useAppSelector(
        (state: RootState) => state.auth.isAuthenticated
    )
    console.log(isAuthenticated)

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
