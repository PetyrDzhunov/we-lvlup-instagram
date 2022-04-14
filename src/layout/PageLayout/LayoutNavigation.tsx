import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import InstagramLogo from '../../components/InstagramLogo'

function LayoutNavigation(): JSX.Element {
    const navigate = useNavigate()

    const uploadHandler = (): void => {
        navigate('/upload')
    }

    return (
        <Box
            sx={{
                flexGrow: 1,
            }}
        >
            <AppBar
                elevation={3}
                position="fixed"
                sx={{
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    flexFlow: 'row wrap',
                    justifyContent: 'space-between',
                    flexGrow: 1,
                }}
            >
                <Toolbar>
                    <InstagramLogo layoutLogo />
                </Toolbar>
                <Toolbar>
                    <IconButton
                        onClick={uploadHandler}
                        size="small"
                        edge="start"
                        aria-label="upload"
                        sx={{
                            mr: 2,
                            border: '1px solid black',
                            borderRadius: '8px',
                            color: '#000000',
                            fontWeight: 'bolder',
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
export default LayoutNavigation
