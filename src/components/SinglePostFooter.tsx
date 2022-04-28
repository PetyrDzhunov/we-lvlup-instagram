import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CommentIcon from '@mui/icons-material/Comment'
import ShareIcon from '@mui/icons-material/Share'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'

import { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useNavigate } from 'react-router-dom'
import {
    Avatar,
    Dialog,
    DialogContent,
    DialogTitle,
    Stack,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { likeDislikePost } from '../store/posts/postsSlice'
import { firebasePostsService } from '../services/firebase-service'

interface SinglePostFooterProps {
    postID: string
    description?: string
}

function SinglePostFooter({
    postID,
    description,
}: SinglePostFooterProps): JSX.Element {
    const [open, setOpen] = useState<boolean>(false)
    const loggedInUserID = useAppSelector(
        (state) => state.persistedReducer.auth.uid
    )
    const currentPost = useAppSelector((state) =>
        state.posts.allPosts.find((post) => post.id === postID)
    )

    const currentPostAuthor = useAppSelector((state) =>
        state.users.allUsers.find(
            (currentUser) => currentUser.authID === currentPost?.creator.uid
        )
    )

    const currentPostUsersLikes = useAppSelector((state) =>
        state.users.allUsers.filter((currUser) => {
            return currentPost?.likes.includes(currUser.authID)
        })
    )

    const handleClickOpen = (): void => {
        setOpen(true)
    }

    const handleClickClosed = (): void => {
        setOpen(false)
    }

    const navigate = useNavigate()

    const commentHandler = (): void => {
        navigate(`/posts/${postID}`)
    }

    const showLikes = (): void => {
        handleClickOpen()
    }

    const hasBeenLikedByCurrentUser = currentPost?.likes.some(
        (like) => like === loggedInUserID
    )

    const [error, setError] = useState<string>('')
    const dispatch = useAppDispatch()
    // const [hasLiked, setHasLiked] = useState<boolean>(false)
    const handleLike = async (): Promise<void> => {
        dispatch(likeDislikePost({ id: postID, user: loggedInUserID }))
        try {
            // setHasLiked((prev) => !prev)
            await firebasePostsService.addLikeToPost(postID, loggedInUserID)
        } catch (err) {
            setError('Something went wrong')
        }
    }

    return (
        <AppBar
            elevation={0}
            position="static"
            color="primary"
            sx={{
                top: 'auto',
                bottom: 0,
                backgroundColor: '#ffffff',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    padding: '0',
                }}
            >
                {!hasBeenLikedByCurrentUser && (
                    <IconButton onClick={handleLike}>
                        <FavoriteBorderIcon
                            fontSize="medium"
                            sx={{ color: '#000000' }}
                        />
                    </IconButton>
                )}

                {hasBeenLikedByCurrentUser && (
                    <IconButton onClick={handleLike}>
                        <FavoriteIcon
                            fontSize="medium"
                            sx={{ color: '#FF0000' }}
                        />
                    </IconButton>
                )}

                <IconButton onClick={commentHandler}>
                    <CommentIcon fontSize="medium" sx={{ color: '#000000' }} />
                </IconButton>
                <IconButton>
                    <ShareIcon fontSize="medium" sx={{ color: '#000000' }} />
                </IconButton>
            </Toolbar>
            <Typography
                onClick={showLikes}
                sx={{
                    color: '#000000',
                    marginLeft: '10px',
                    fontSize: '0.9em',
                    fontWeight: '600',
                }}
            >
                {currentPost?.likes.length} харесвания
            </Typography>
            {error && (
                <Typography
                    align="center"
                    color="error"
                    variant="body2"
                    sx={{ fontWeight: 'bolder', marginTop: '10px' }}
                    paragraph
                >
                    {error}
                </Typography>
            )}

            {description && (
                <Typography
                    variant="body2"
                    component="h6"
                    sx={{
                        color: '#000000',
                        fontWeight: '600',
                        marginTop: '4px',
                        marginLeft: '10px',
                    }}
                >
                    {currentPostAuthor?.username ||
                        currentPostAuthor?.fullName ||
                        currentPostAuthor?.email.split('@')[0]}
                    <Typography
                        variant="body2"
                        component="p"
                        sx={{
                            color: '#000000',
                            fontWeight: '400',
                            marginTop: '4px',
                            marginLeft: '5px',
                            display: 'inline',
                            wordBreak: 'break-all',
                        }}
                    >
                        {description}
                    </Typography>
                </Typography>
            )}
            <Dialog open={open} onClose={handleClickClosed}>
                <DialogTitle sx={{ textAlign: 'center' }}>Liked by</DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={handleClickClosed}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    {currentPostUsersLikes.map((currentUser) => (
                        <Stack
                            key={currentUser?.authID}
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            sx={{
                                margin: '15px',
                            }}
                        >
                            <Avatar
                                src={currentUser?.profileImage}
                                sx={{ width: '40px', height: '40px' }}
                            />
                            <Typography
                                sx={{
                                    fontWeight: 'bolder',
                                    marginBottom: '4px',
                                }}
                            >
                                {currentUser?.username ||
                                    currentUser?.fullName ||
                                    currentUser?.email.split('@')[0]}
                            </Typography>
                        </Stack>
                    ))}
                </DialogContent>
            </Dialog>
        </AppBar>
    )
}
export default SinglePostFooter
