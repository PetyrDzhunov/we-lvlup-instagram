import { Link } from 'react-router-dom'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// import LoginWithFacebook from '../LoginWithFacebook'
import FlexBoxCentered from '../FlexBoxCentered'

function FacebookLogin(): JSX.Element {
    return (
        <FlexBoxCentered
            flexDirection="column wrap"
            component="section"
            sx={{
                marginTop: '15px',
            }}
        >
            {/* <LoginWithFacebook /> */}
            <FlexBoxCentered
                flexDirection="row wrap"
                component="article"
                sx={{
                    marginTop: '15px',
                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        display: 'block',
                        fontSize: '1.3em',
                    }}
                >
                    No account?
                </Typography>
                <Link to="/register" className="basic-link">
                    <Button
                        sx={{
                            color: '#0095f6',
                            fontSize: '1.3em',
                            textTransform: 'capitalize',
                            fontWeight: 'bold',
                        }}
                        variant="text"
                    >
                        Register
                    </Button>
                </Link>
            </FlexBoxCentered>
        </FlexBoxCentered>
    )
}

export default FacebookLogin
