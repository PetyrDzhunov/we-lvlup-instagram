/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react'
import Avatar from '@mui/material/Avatar'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { User } from '../../types'

import { useAppSelector } from '../../hooks/redux-hooks'
import '../../styles/file-input.css'
import '../../styles/image-preview.css'
import NotFoundPage from '../not-found-page/NotFoundPage'

interface SingleStoryProps {
    user: User
}

function SingleStory({ user }: SingleStoryProps): JSX.Element {
    const [open, setOpen] = useState<boolean>(false)
    const loggedInUserID = useAppSelector(
        (state) => state.persistedReducer.auth.uid
    )
    const allUsers = useAppSelector((state) => state.users.allUsers)

    const loggedInUser = allUsers.find(
        (currUser) => currUser.authID === loggedInUserID
    )

    if (loggedInUser === undefined) {
        return <NotFoundPage />
    }

    const handleClickOpen = (): void => {
        setOpen(true)
    }

    const handleClose = (): void => {
        setOpen(false)
    }

    const viewStoryHandler = (): void => {
        handleClickOpen()
    }

    return (
        <Box
            key={user.authID}
            sx={{
                marginTop: '40px',
                marginLeft: '12px',
                display: 'flex',
                flexFlow: 'row nowrap',
            }}
        >
            {user && user.story && (
                <Stack
                    direction="column"
                    spacing={1}
                    sx={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <Stack
                        sx={{
                            borderRadius: '50%',
                            border: '2px solid red',
                        }}
                    >
                        <Avatar
                            onClick={viewStoryHandler}
                            alt="profile picture of the user"
                            src={user.profileImage}
                            sx={{ width: 56, height: 56 }}
                        />
                    </Stack>

                    <Typography
                        sx={{
                            fontSize: '0.7rem',
                            marginTop: '4px',
                        }}
                    >
                        {user.username || user.email.split('@')[0]}
                    </Typography>
                </Stack>
            )}

            <Dialog
                sx={{
                    minWidth: '60%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0',
                }}
                open={open}
                onClose={handleClose}
            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        color: '#ffffff',
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={{ padding: '0' }}>
                    <img
                        className="story-preview"
                        src={user.story}
                        alt="the user story"
                    />
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default SingleStory
