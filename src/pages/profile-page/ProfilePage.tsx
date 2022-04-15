import Box from '@mui/material/Box'
import { Helmet } from 'react-helmet'
import PageLayout from '../../layout/PageLayout/PageLayout'
import { PageProps } from '../../types'

function ProfilePage({ title }: PageProps): JSX.Element {
    return (
        <PageLayout>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Box>
                Profile Page
                <p>Hello this is the Profile page</p>
                <p>Hello this is the Profile page</p>
                <p>Hello this is the Profile page</p>
                <p>Hello this is the Profile page</p>
                <p>Hello this is the Profile page</p>
                <p>Hello this is the Profile page</p>
                <p>Hello this is the Profile page</p>
                <p>Hello this is the Profile page</p>
            </Box>
        </PageLayout>
    )
}

export default ProfilePage
