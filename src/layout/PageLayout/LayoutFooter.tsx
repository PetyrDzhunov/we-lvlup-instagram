import React from 'react'
import AppBar from '@mui/material/AppBar/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import SlideshowIcon from '@mui/icons-material/Slideshow'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
// import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import LogoutIcon from '@mui/icons-material/Logout'
import Button from '@mui/material/Button'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

function LayoutFooter(): JSX.Element {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    )
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorElUser(event.currentTarget)
    }
    const handleCloseUserMenu = (): void => {
        setAnchorElUser(null)
    }

    return (
        <AppBar
            position="fixed"
            color="primary"
            sx={{ top: 'auto', bottom: 0, backgroundColor: '#ffffff' }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <IconButton>
                    <HomeIcon sx={{ color: '#000000' }} />
                </IconButton>
                <IconButton>
                    <SearchIcon sx={{ color: '#000000' }} />
                </IconButton>
                <IconButton>
                    <SlideshowIcon sx={{ color: '#000000' }} />
                </IconButton>
                <IconButton>
                    <ShoppingBagIcon sx={{ color: '#000000' }} />
                </IconButton>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                            alt="Petar Dzhunov"
                            src="https://scontent-sof1-1.xx.fbcdn.net/v/t1.6435-9/46096237_2325829154111935_8649533757222551552_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=730e14&_nc_ohc=hV28oAX0DWwAX_zyn-u&_nc_oc=AQmdOiCP8hzovWuuhTyIpR3IjgdfZGafX-LREaRR_vL4NZp5db3vL9M6G0ZdThfVgo2w6fzNy5zcLEwUUQnBBRdR&_nc_ht=scontent-sof1-1.xx&oh=00_AT-K-VGKw1pjRjX4rdhvLDRLofvlyWy2vkHVrOKtCneIhA&oe=627E7ABD"
                        />
                    </IconButton>
                </Tooltip>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Button
                            sx={{ color: '#000000' }}
                            endIcon={<LogoutIcon />}
                        >
                            Logout
                        </Button>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Button
                            sx={{ color: '#000000' }}
                            endIcon={<AccountBoxIcon />}
                        >
                            Profile
                        </Button>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}

export default LayoutFooter
