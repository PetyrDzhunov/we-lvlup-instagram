import '../../styles/optional-login.css'
import Box from '@mui/material/Box'
import DownloadApplication from './DownloadApplication'
import FacebookLogin from './FacebookLogin'
import GuestPageFooter from './GuestPageFooter'
import LoginOrComponent from '../LoginOrComponent'

function OptionalLogin(): JSX.Element {
    return (
        <Box>
            <LoginOrComponent />
            <FacebookLogin />
            <DownloadApplication />
            <GuestPageFooter />
        </Box>
    )
}

export default OptionalLogin
