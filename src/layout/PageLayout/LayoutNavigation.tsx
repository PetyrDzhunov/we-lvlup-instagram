import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import IconButton from '@mui/material/IconButton'
import AppBar from '@mui/material/AppBar'
import { styled, useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import FormControlLabel from '@mui/material/FormControlLabel'
import InstagramLogo from '../../components/InstagramLogo'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { toggleTheme } from '../../store/auth/authSlice'

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff'
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor:
                    theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff'
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}))

function LayoutNavigation(): JSX.Element {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const handleSwitchTheme = (): void => {
        dispatch(toggleTheme())
    }

    const theme = useTheme()
    const currentUserTheme = useAppSelector(
        (state) => state.persistedReducer.auth.theme
    )
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
                <FormControlLabel
                    onChange={handleSwitchTheme}
                    control={
                        <MaterialUISwitch
                            sx={{ m: 1 }}
                            defaultChecked={currentUserTheme === 'dark'}
                        />
                    }
                    label=""
                />
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
export default LayoutNavigation
