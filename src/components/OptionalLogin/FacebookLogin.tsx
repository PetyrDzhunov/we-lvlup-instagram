import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import LoginWithFacebook from '../LoginWithFacebook'

function FacebookLogin(): JSX.Element {
    return (
        <Box
            component="section"
            sx={{
                display: 'flex',
                flexFlow: 'column wrap',
                justifyContent: 'center',
                alignItems: 'center',
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
            <Box
                component="article"
                sx={{
                    display: 'flex',
                    flexFlow: 'row wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
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
            </Box>
        </Box>
    )
}

export default FacebookLogin
