import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { PageProps } from '../../types'
import '../../styles/optional-login.css'
import PageLayout from '../../layout/PageLayout/PageLayout'

function NotFoundPage({ title }: PageProps): JSX.Element {
    return (
        <PageLayout>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Container
                sx={{
                    display: 'flex',
                    flexFlow: 'column wrap',
                    justifyContent: 'center',
                    padding: '40px',
                    height: '100vh',
                }}
            >
                <Typography
                    variant="h6"
                    align="center"
                    sx={{ fontWeight: 'bold', marginBottom: '30px' }}
                >
                    Unfortunetaly this page is not found!
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    align="center"
                    sx={{ fontSize: '0.91em' }}
                >
                    No page
                </Typography>
                <Link
                    style={{ color: 'blue', textAlign: 'center' }}
                    className="basic-link"
                    to="/"
                >
                    Back to Instagram
                </Link>
            </Container>
        </PageLayout>
    )
}

export default NotFoundPage
