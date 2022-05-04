import { Link } from 'react-router-dom'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import LoginWithFacebook from '../LoginWithFacebook'
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
            <LoginWithFacebook />
            <Typography
                variant="body2"
                sx={{
                    fontSize: '0.75em',
                    marginTop: '10px',
                    marginBottom: '30px',
                }}
            >
                Забравена парола?
            </Typography>
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
                        fontSize: '0.82em',
                    }}
                >
                    Нямате акаунт?
                </Typography>
                <Link to="/register" className="basic-link">
                    <Button
                        sx={{
                            color: '#0095f6',
                            fontSize: '0.82em',
                            textTransform: 'capitalize',
                            fontWeight: 'bold',
                        }}
                        variant="text"
                    >
                        Регистрация
                    </Button>
                </Link>
            </FlexBoxCentered>
        </FlexBoxCentered>
    )
}

export default FacebookLogin
