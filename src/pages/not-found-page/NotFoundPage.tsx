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
                    За съжаление тази страница не е налична.
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    align="center"
                    sx={{ fontSize: '0.91em' }}
                >
                    Връзката, която сте последвали, може би е прекъсната или
                    страницата е премахната.
                </Typography>
                <Link
                    style={{ color: 'blue', textAlign: 'center' }}
                    className="basic-link"
                    to="/"
                >
                    Обратно към Instagram.
                </Link>
            </Container>
        </PageLayout>
    )
}

export default NotFoundPage
