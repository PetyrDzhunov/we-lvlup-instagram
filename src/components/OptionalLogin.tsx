import '../styles/optional-login.css'
import Box from '@mui/material/Box'
import DownloadApplication from './DownloadApplication'
import FacebookLogin from './FacebookLogin'
import GuestPageFooter from './GuestPageFooter'

function OptionalLogin(): JSX.Element {
    return (
        <Box>
            <div className="optional-login">
                <span className="dash" />
                <div className="optional-login__text">или</div>
                <span className="dash" />
            </div>
            <FacebookLogin />
            <DownloadApplication />
            <GuestPageFooter />
        </Box>
    )
}

export default OptionalLogin
