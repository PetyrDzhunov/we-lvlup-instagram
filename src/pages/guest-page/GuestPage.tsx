import { Helmet } from 'react-helmet'

import Container from '@mui/material/Container'

import { PageProps } from '../../types'
import InstagramLogo from '../../components/InstagramLogo'
import OptionalLogin from '../../components/OptionalLogin/OptionalLogin'

import LoginForm from './LoginForm'

function GuestPage({ title }: PageProps): JSX.Element {
    return (
        <div>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Container>
                <InstagramLogo />
                <LoginForm />
                <OptionalLogin />
            </Container>
        </div>
    )
}

export default GuestPage
