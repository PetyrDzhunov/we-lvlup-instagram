import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FacebookIcon from '@mui/icons-material/Facebook'
import Button from '@mui/material/Button'

function FacebookLogin(): JSX.Element {
    return (
        <Box
            component="div"
            sx={{
                display: 'flex',
                flexFlow: 'column wrap',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '15px',
            }}
        >
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    flexFlow: 'row wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '15px',
                }}
            >
                <FacebookIcon color="primary" />
                <Typography
                    paragraph
                    variant="body2"
                    margin="10px"
                    sx={{ fontWeight: 'bold', color: '#385185' }}
                >
                    Влизане с Facebook
                </Typography>
            </Box>
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
                component="div"
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
            </Box>
        </Box>
    )
}

export default FacebookLogin
