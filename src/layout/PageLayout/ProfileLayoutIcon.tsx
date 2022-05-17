import React, { useEffect, useState } from 'react'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { DocumentData } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../store/auth/authSlice'
import { firebaseUsersService } from '../../services/firebase-service'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'

function ProfileLayoutIcon(): JSX.Element {
    const [user, setUser] = useState<DocumentData>()
    const uid = useAppSelector((state) => state.persistedReducer.auth.uid)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const userID = useAppSelector((state) => state.persistedReducer.auth.uid)
    const currentLoggedUser = useAppSelector((state) =>
        state.users.allUsers.find((currUser) => currUser.authID === userID)
    )

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

    let imgSrc
    if (currentLoggedUser) {
        imgSrc = currentLoggedUser.profileImage
    } else if (user) {
        imgSrc = user.profileImage
    } else {
        imgSrc = ''
    }

    const logoutHandler = (): void => {
        handleCloseUserMenu()
        dispatch(logout())
        navigate('/')
    }

    const profileHandler = (): void => {
        handleCloseUserMenu()
        navigate(`/profile/${userID}`)
    }
    return (
        <>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Profile picture of the user" src={imgSrc} />
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
                        sx={{ color: 'text.primary' }}
                        endIcon={<LogoutIcon />}
                    >
                        Logout
                    </Button>
                </MenuItem>
                <MenuItem onClick={profileHandler}>
                    <Button
                        sx={{ color: 'text.primary' }}
                        endIcon={<AccountBoxIcon />}
                    >
                        Profile
                    </Button>
                </MenuItem>
            </Menu>
        </>
    )
}

export default ProfileLayoutIcon
