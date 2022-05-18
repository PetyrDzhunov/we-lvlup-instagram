import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import AddIcon from '@mui/icons-material/Add'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'

import { useMediaQuery } from '@mui/material'
import HomeLayoutIcon from './HomeLayoutIcon'
import SearchLayoutIcon from './SearchLayoutIcon'
import ProfileLayoutIcon from './ProfileLayoutIcon'

import InstagramLogo from '../../components/InstagramLogo'
import SearchInput from '../../components/SearchInput'
import LayoutSwitchThemeIcon from './LayoutSwitchThemeIcon'

function DesktopLayoutNavigation(): JSX.Element {
    const [isSearching, setIsSearching] = useState<boolean>(false)

    const navigate = useNavigate()
    const theme = useTheme()
    const uploadHandler = (): void => {
        navigate('/upload')
    }

    const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'))
    const isLaptop = useMediaQuery(theme.breakpoints.up('lg'))
    const isIpad = useMediaQuery(theme.breakpoints.between('sm', 'md'))

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
                    justifyContent: isTablet ? 'space-evenly' : 'space-between',
                    flexGrow: 1,
                }}
            >
                <Toolbar>
                    <InstagramLogo layoutLogo />
                    <LayoutSwitchThemeIcon desktop />
                </Toolbar>

                <SearchLayoutIcon desktop setIsSearching={setIsSearching} />
                {isLaptop && isSearching && <SearchInput />}

                <Toolbar>
                    <HomeLayoutIcon desktop />
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
                    <ProfileLayoutIcon />
                </Toolbar>
                {isTablet && isSearching && <SearchInput />}
                {isIpad && isSearching && <SearchInput />}
            </AppBar>
        </Box>
    )
}

export default DesktopLayoutNavigation
