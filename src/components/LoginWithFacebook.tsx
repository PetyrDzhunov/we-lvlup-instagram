import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FacebookIcon from '@mui/icons-material/Facebook'
import Button from '@mui/material/Button'

interface LoginWithFacebookProps {
    contained?: boolean
}

function LoginWithFacebook({ contained }: LoginWithFacebookProps): JSX.Element {
    if (contained) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '40px',
                    margin: '20px',
                }}
            >
                <Button variant="contained">
                    <Box
                        component="article"
                        sx={{
                            display: 'flex',
                            flexFlow: 'row wrap',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '0px',
                        }}
                    >
                        <FacebookIcon sx={{ color: '#FFFFFF' }} />
                        <Typography
                            paragraph
                            variant="body2"
                            margin="10px"
                            sx={{ fontWeight: 'bold', color: '#FFFFFF' }}
                        >
                            Влизане с Facebook
                        </Typography>
                    </Box>
                </Button>
            </Box>
        )
    }
    return (
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
    )
}

export default LoginWithFacebook
