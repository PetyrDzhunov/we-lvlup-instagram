import React, { useEffect, useState } from 'react'
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
import { useNavigate } from 'react-router-dom'
import { DocumentData } from 'firebase/firestore/lite'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { logout } from '../../store/auth/authSlice'
import { firebaseUsersService } from '../../services/firebase-service'

function LayoutFooter(): JSX.Element {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const uid = useAppSelector((state) => state.persistedReducer.auth.uid)

    const [user, setUser] = useState<DocumentData>()

    const userID = useAppSelector((state) => state.persistedReducer.auth.uid)
    const currentLoggedUser = useAppSelector((state) =>
        state.users.allUsers.find((currUser) => currUser.authID === userID)
    )

    let imgSrc
    if (currentLoggedUser) {
        imgSrc = currentLoggedUser.profileImage
    } else if (user) {
        imgSrc = user.profileImage
    } else {
        imgSrc = ''
    }

    useEffect(() => {
        const getUser = async (): Promise<void> => {
            const currentUser = await firebaseUsersService.getUserById(uid)
            setUser(currentUser)
        }
        getUser()
    }, [uid])

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    )
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorElUser(event.currentTarget)
    }
    const handleCloseUserMenu = (): void => {
        setAnchorElUser(null)
    }

    const logoutHandler = (): void => {
        handleCloseUserMenu()
        dispatch(logout())
        navigate('/')
    }

    const profileHandler = (): void => {
        handleCloseUserMenu()
        navigate('/profile')
    }

    const homeHandler = (): void => {
        navigate('/')
    }

    return (
        <AppBar
            position="fixed"
            color="primary"
            sx={{ top: 'auto', bottom: 0, backgroundColor: '#ffffff' }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <IconButton onClick={homeHandler}>
                    <HomeIcon fontSize="medium" sx={{ color: '#000000' }} />
                </IconButton>
                <IconButton>
                    <SearchIcon fontSize="medium" sx={{ color: '#000000' }} />
                </IconButton>
                <IconButton>
                    <SlideshowIcon
                        fontSize="medium"
                        sx={{ color: '#000000' }}
                    />
                </IconButton>
                <IconButton>
                    <ShoppingBagIcon
                        fontSize="medium"
                        sx={{ color: '#000000' }}
                    />
                </IconButton>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                            alt="Profile picture of the user"
                            src={imgSrc}
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
                    <MenuItem onClick={logoutHandler}>
                        <Button
                            sx={{ color: '#000000' }}
                            endIcon={<LogoutIcon />}
                        >
                            Logout
                        </Button>
                    </MenuItem>
                    <MenuItem onClick={profileHandler}>
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
