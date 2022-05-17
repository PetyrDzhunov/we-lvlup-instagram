import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import AddIcon from '@mui/icons-material/Add'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'

import InstagramLogo from '../../components/InstagramLogo'

function MobileLayoutNavigation(): JSX.Element {
    const navigate = useNavigate()
    const theme = useTheme()
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
                    backgroundColor: theme.palette.background.paper,
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
                            border: `1px solid ${theme.palette.text.primary}`,
                            borderRadius: '8px',
                            color: theme.palette.text.primary,
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
export default MobileLayoutNavigation
