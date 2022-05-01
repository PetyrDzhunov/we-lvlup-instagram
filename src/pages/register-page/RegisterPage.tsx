import { Button, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import InstagramLogo from '../../components/InstagramLogo'
import LoginOrComponent from '../../components/LoginOrComponent'
import LoginWithFacebook from '../../components/LoginWithFacebook'
import RegisterForm from './RegisterForm'
import DownloadApplication from '../../components/OptionalLogin/DownloadApplication'
import GuestPageFooter from '../../components/OptionalLogin/GuestPageFooter'
import { PageProps } from '../../types'

function RegisterPage({ title }: PageProps): JSX.Element {
    return (
        <Container>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <InstagramLogo />
            <Typography
                variant="h5"
                component="h5"
                align="center"
                sx={{
                    marginBottom: '10px',
                    color: '#8e8e8e',
                    fontSize: '1.15em',
                    fontWeight: '600',
                }}
            >
                Регистрирайте се, за да виждате снимки и видеоклипове от ваши
                приятели.
            </Typography>
            <LoginWithFacebook contained />
            <LoginOrComponent />
            <RegisterForm />
            <Typography
                paragraph
                align="center"
                sx={{
                    color: '#8e8e8e',
                    fontWeight: '500',
                    fontSize: '0.75em',
                    margin: '15px 0',
                }}
            >
                Когато се регистрирате, вие се съгласявате с нашите Условия.
                Научете как събираме, използваме и споделяме данните ви в нашата
                Политика зза данни, както и как използваме бисквитките и сходни
                техноогии в нашата Политика за бисквитки.
            </Typography>
            <Box
                component="article"
                sx={{
                    display: 'flex',
                    flexFlow: 'row wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography
                    sx={{
                        display: 'inline',
                        fontSize: '0.82em',
                    }}
                    variant="body1"
                >
                    Имате акаунт?
                </Typography>
                <Link className="basic-link" to="/">
                    <Button sx={{ textTransform: 'capitalize' }} variant="text">
                        Влезте
                    </Button>
                </Link>
            </Box>
            <DownloadApplication />
            <GuestPageFooter register />
        </Container>
    )
}

export default RegisterPage
