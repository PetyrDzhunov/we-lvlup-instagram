import AppBar from '@mui/material/AppBar/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import SlideshowIcon from '@mui/icons-material/Slideshow'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

function LayoutFooter(): JSX.Element {
    return (
        <AppBar
            position="fixed"
            color="primary"
            sx={{ top: 'auto', bottom: 0, backgroundColor: '#ffffff' }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <IconButton color="primary">
                    <HomeIcon sx={{ color: '#000000' }} />
                </IconButton>
                <IconButton color="primary">
                    <SearchIcon sx={{ color: '#000000' }} />
                </IconButton>
                <IconButton color="primary">
                    <SlideshowIcon sx={{ color: '#000000' }} />
                </IconButton>
                <IconButton color="primary">
                    <ShoppingBagIcon sx={{ color: '#000000' }} />
                </IconButton>
                <IconButton color="primary">
                    <AccountCircleIcon sx={{ color: '#000000' }} />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default LayoutFooter
