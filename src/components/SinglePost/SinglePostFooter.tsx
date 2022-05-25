import { memo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Stack from '@mui/material/Stack'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Toolbar from '@mui/material/Toolbar'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import ShareIcon from '@mui/icons-material/Share'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import DialogTitle from '@mui/material/DialogTitle'
import CommentIcon from '@mui/icons-material/Comment'
import DialogContent from '@mui/material/DialogContent'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

import Error from '../Error'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { likeDislikePost } from '../../store/posts/postsSlice'
import { firebasePostsService } from '../../services/firebase-service'
import { Post, User } from '../../types'

interface SinglePostFooterProps {
    loggedInUserID: string
    description: string
    author: User
    likes: User[]
    liked: boolean
    postID: string
    post: Post
}

function SinglePostFooter({
    loggedInUserID,
    description,
    author,
    likes,
    liked,
    postID,
    post: currentPost,
}: SinglePostFooterProps): JSX.Element {
    const [open, setOpen] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const theme = useTheme()

    const { postID: hasParams } = useParams()

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

    const dispatch = useAppDispatch()
    const handleLike = async (): Promise<void> => {
        dispatch(likeDislikePost({ id: postID, user: loggedInUserID }))
        try {
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
                backgroundColor: theme.palette.background.paper,
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    padding: '0',
                }}
            >
                {!liked && (
                    <IconButton onClick={handleLike}>
                        <FavoriteBorderIcon
                            fontSize="medium"
                            sx={{ color: theme.palette.text.primary }}
                        />
                    </IconButton>
                )}

                {liked && (
                    <IconButton onClick={handleLike}>
                        <FavoriteIcon
                            fontSize="medium"
                            sx={{ color: '#FF0000' }}
                        />
                    </IconButton>
                )}

                <IconButton onClick={commentHandler}>
                    <CommentIcon
                        fontSize="medium"
                        sx={{ color: theme.palette.text.primary }}
                    />
                </IconButton>
                <IconButton>
                    <ShareIcon
                        fontSize="medium"
                        sx={{ color: theme.palette.text.primary }}
                    />
                </IconButton>
            </Toolbar>
            <Typography
                onClick={showLikes}
                sx={{
                    color: theme.palette.text.primary,
                    marginLeft: '10px',
                    fontSize: '0.9em',
                    fontWeight: '600',
                }}
            >
                {currentPost?.likedBy.length} харесвания
            </Typography>
            <Typography
                onClick={commentHandler}
                sx={{
                    color: theme.palette.text.primary,
                    marginLeft: '10px',
                    fontSize: '0.9em',
                    fontWeight: '600',
                    marginTop: '4px',
                }}
            >
                {!hasParams && currentPost!.comments.length > 0
                    ? `Преглед на всички ${currentPost?.comments.length} коментари `
                    : null}
            </Typography>

            {error && <Error error={error} />}

            {description && (
                <Typography
                    variant="body2"
                    component="h6"
                    sx={{
                        color: theme.palette.text.primary,
                        fontWeight: '600',
                        marginTop: '4px',
                        marginLeft: '10px',
                    }}
                >
                    {author?.username ||
                        author?.fullName ||
                        author?.email.split('@')[0]}
                    <Typography
                        variant="body2"
                        component="p"
                        sx={{
                            color: theme.palette.text.primary,
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
                        color: (themed) => themed.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    {likes.map((currentUser) => (
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
                                onClick={() =>
                                    navigate(`/profile/${currentUser?.authID}`)
                                }
                                src={currentUser?.profileImage}
                                sx={{ width: '40px', height: '40px' }}
                            />
                            <Typography
                                sx={{
                                    fontWeight: 'bolder',
                                    marginBottom: '4px',
                                    color: theme.palette.text.primary,
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
export default memo(SinglePostFooter)
