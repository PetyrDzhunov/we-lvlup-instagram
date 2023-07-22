import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { PageProps } from '../../types'
import InstagramLogo from '../../components/InstagramLogo'
// import LoginOrComponent from '../../components/LoginOrComponent'
// import LoginWithFacebook from '../../components/LoginWithFacebook'
import GuestPageFooter from '../../components/OptionalLogin/GuestPageFooter'
// import DownloadApplication from '../../components/OptionalLogin/DownloadApplication'

import RegisterForm from './RegisterForm'
import FlexBoxCentered from '../../components/FlexBoxCentered'

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
                Register to see photos and videos from your friends
            </Typography>
            {/* <LoginWithFacebook contained /> */}
            {/* <LoginOrComponent /> */}
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
                When you register, you agree to our Terms. Learn how we collect,
                use, and share your data in our Data Policy, as well as how we
                use cookies and similar technologies in our Cookie Policy.
            </Typography>
            <FlexBoxCentered flexDirection="row wrap" component="article">
                <Typography
                    sx={{
                        display: 'inline',
                        fontSize: '0.82em',
                    }}
                    variant="body1"
                >
                    Have an account?
                </Typography>
                <Link className="basic-link" to="/">
                    <Button sx={{ textTransform: 'capitalize' }} variant="text">
                        Login
                    </Button>
                </Link>
            </FlexBoxCentered>
            {/* <DownloadApplication /> */}
            <GuestPageFooter register />
        </Container>
    )
}

export default RegisterPage
