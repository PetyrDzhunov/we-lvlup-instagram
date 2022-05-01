import Box from '@mui/material/Box'

import '../../styles/optional-login.css'
import LoginOrComponent from '../LoginOrComponent'

import FacebookLogin from './FacebookLogin'
import GuestPageFooter from './GuestPageFooter'
import DownloadApplication from './DownloadApplication'

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
