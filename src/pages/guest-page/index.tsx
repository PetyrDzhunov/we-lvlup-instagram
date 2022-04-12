import Container from '@mui/material/Container'
import InstagramLogo from '../../components/InstagramLogo'
import OptionalLogin from '../../components/OptionalLogin'
import LoginForm from './LoginForm'

function GuestPage(): JSX.Element {
    return (
        <Container>
            <InstagramLogo />
            <LoginForm />
            <OptionalLogin />
        </Container>
    )
}

export default GuestPage
