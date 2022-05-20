import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'

import { Post } from '../../types'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { firebaseUsersService } from '../../services/firebase-service'
import { addFollower } from '../../store/users/usersSlice'

interface SinglePostHeaderProps {
    profileImage: string
    post: Post
    id: string
}

function SinglePostHeader({
    profileImage,
    post,
    id,
}: SinglePostHeaderProps): JSX.Element {
    const [error, setError] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)

    const navigate = useNavigate()
    const leadToProfilePage = (): void => {
        navigate(`/profile/${id}`)
    }

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ): void => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }
    const currentUser = useAppSelector((state) =>
        state.users.allUsers.find(
            (currUser) => currUser.authID === post.creator.uid
        )
    )
    // filter only the posts that the loggedInUser followed to know on which one to display to follow him / unfollow him
    const dispatch = useAppDispatch()

    const { uid } = useAppSelector((state) => state.persistedReducer.auth)
    const hasFollowed = currentUser?.followers.includes(uid)
    // get the logged in userID
    // for each post get its ID and if its creator is equal to the logged in userID do not display the follow button!!!
    const isDisplayingFollowButton = uid === post.creator.uid
    const handleFollowUser = async (): Promise<void> => {
        if (currentUser === undefined) {
            return
        }

        dispatch(
            addFollower({
                loggedInUserId: uid,
                currentUserId: currentUser.authID,
            })
        )
        if (uid === currentUser.authID) {
            setOpen(true)
            return setError("You can't follow yourself.")
        }
        try {
            await firebaseUsersService.addFollower(uid, currentUser.authID)
        } catch (err) {
            setError('Unable to follow, try again later')
        }
    }

    return (
        <Stack
            justifyContent="space-between"
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{
                width: '100%',
                marginBottom: '8px',
                marginLeft: '4px',
                marginTop: '10px',
            }}
        >
            <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                    onClick={leadToProfilePage}
                    src={profileImage}
                    sx={{ width: '40px', height: '40px' }}
                />
                <Typography sx={{ fontWeight: 'bolder', marginBottom: '4px' }}>
                    {currentUser?.username ||
                        currentUser?.fullName ||
                        currentUser?.email.split('@')[0]}
                </Typography>
            </Stack>

            {!isDisplayingFollowButton && (
                <Button
                    variant="text"
                    sx={{
                        fontSize: '0.85em',
                        fontWeight: 'bold',
                        justifySelf: 'flex-end',
                    }}
                    onClick={handleFollowUser}
                >
                    {hasFollowed ? 'Unfollow' : 'Follow'}
                </Button>
            )}

            {error && (
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity="warning"
                        sx={{ width: '100%' }}
                    >
                        {error}
                    </Alert>
                </Snackbar>
            )}
        </Stack>
    )
}

export default memo(SinglePostHeader)
