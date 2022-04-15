import Container from '@mui/material/Container'
import { Helmet } from 'react-helmet'
import InstagramLogo from '../../components/InstagramLogo'
import OptionalLogin from '../../components/OptionalLogin'
import { PageProps } from '../../types'
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
