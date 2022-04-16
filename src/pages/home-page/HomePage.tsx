import Box from '@mui/material/Box'
import { Helmet } from 'react-helmet'
import PageLayout from '../../layout/PageLayout/PageLayout'
import { PageProps } from '../../types'

function HomePage({ title }: PageProps): JSX.Element {
    console.log(title)
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
