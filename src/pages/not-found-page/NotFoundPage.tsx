import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks'
import PageLayout from '../../layout/PageLayout/PageLayout'

function NotFoundPage(): JSX.Element {
    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
    )

    return (
        <PageLayout>
            <Container
                sx={{
                    display: 'flex',
                    flexFlow: 'column wrap',
                    justifyContent: 'center',
                    padding: '40px',
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
                    to={isAuthenticated ? '/home' : '/'}
                >
                    Обратно към Instagram.
                </Link>
            </Container>
        </PageLayout>
    )
}

export default NotFoundPage
