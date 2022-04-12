import Container from '@mui/material/Container'
import InstagramLogo from '../../components/InstagramLogo'
import LoginForm from './LoginForm'

function GuestPage(): JSX.Element {
    return (
        <Container>
            <InstagramLogo />
            <LoginForm />
        </Container>
    )
}

export default GuestPage
