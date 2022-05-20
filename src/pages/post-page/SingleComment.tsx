import React, { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import ListItem from '@mui/material/ListItem'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DialogContent from '@mui/material/DialogContent'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

import { TextField } from '@mui/material'
import { Comment, Reply } from '../../types'
import {
    addReplyToComment,
    likeDislikeComment,
    likeDislikeReply,
} from '../../store/posts/postsSlice'
import { firebasePostsService } from '../../services/firebase-service'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'

interface SingleCommentProps {
    comment: Comment
}

function SingleComment({ comment }: SingleCommentProps): JSX.Element {
    const [error, setError] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)
    const [wantsToReply, setWantsToReply] = useState<boolean>(false)
    const [reply, setReply] = useState<string>('')
    const [showReplyLikes, setShowReplyLikes] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const currentCommentCreator = useAppSelector((state) => {
        return state.users.allUsers.find(
            (currUser) => currUser.authID === comment.commentatorID
        )
    })

    const allUsers = useAppSelector((state) => state.users.allUsers)

    const loggedInUserID = useAppSelector(
        (state) => state.persistedReducer.auth.uid
    )

    const userLoggedIn = useAppSelector((state) =>
        state.users.allUsers.find(
            (currUser) => currUser.authID === loggedInUserID
        )
    )

    const currentCommentUsersLikes = useAppSelector((state) =>
        state.users.allUsers.filter((currUser) => {
            return comment.likes.includes(currUser.authID)
        })
    )

    const handleReply = (): void => {
        setWantsToReply((prevState) => !prevState)
    }

    const currentPost = useAppSelector((state) =>
        state.posts.allPosts.find((post) => {
            if (post.comments.length > 0) {
                return post.comments.includes(comment)
            }
            return null
        })
    )

    const handleSendReply = async (): Promise<void> => {
        if (userLoggedIn?.username === undefined) {
            return
        }

        if (currentPost === undefined) {
            return
        }

        const newReply = {
            postID: currentPost.id,
            replyUserID: loggedInUserID,
            commentID: comment.commentID,
            reply,
            replier: userLoggedIn?.username,
            replyID: uuidv4(),
            replyLikes: [],
        }

        dispatch(addReplyToComment(newReply))
        setReply('')
        setWantsToReply((prev) => !prev)

        try {
            await firebasePostsService.addReplyToComment(newReply)
        } catch (err) {
            setError('Something went wrong. Try again later.')
        }
    }

    const handleReplyWithKeyboard = async (
        event: React.KeyboardEvent
    ): Promise<void> => {
        if (userLoggedIn?.username === undefined) {
            return
        }

        if (currentPost === undefined) {
            return
        }
        let newReply
        if (event.key === 'Enter') {
            newReply = {
                postID: currentPost.id,
                replyUserID: loggedInUserID,
                commentID: comment.commentID,
                reply,
                replier: userLoggedIn?.username,
                replyID: uuidv4(),
                replyLikes: [],
            }

            dispatch(addReplyToComment(newReply))
            setReply('')
            setWantsToReply((prev) => !prev)
        }
        if (newReply === undefined) {
            return
        }

        try {
            await firebasePostsService.addReplyToComment(newReply)
        } catch (err) {
            setError('Something went wrong. Try again later.')
        }
    }

    const handleReplyChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setReply(event.target.value)
    }

    const hasBeenLikedByCurrentUser = comment?.likes.some(
        (like) => like === loggedInUserID
    )

    const handleClickOpen = (): void => {
        setOpen(true)
    }

    const handleClickClosed = (): void => {
        setOpen(false)
    }

    const showLikedByReplyHandler = (): void => {
        setShowReplyLikes(true)
    }

    const showLikes = (): void => {
        handleClickOpen()
    }

    const handleHideReplyLikes = (): void => {
        setShowReplyLikes(false)
    }

    const handleReplyLike = async (currReply: Reply): Promise<void> => {
        if (currentPost === undefined || currentPost.id === undefined) {
            return
        }
        dispatch(
            likeDislikeReply({
                postID: currentPost.id,
                userID: loggedInUserID,
                commentID: comment.commentID,
                reply: currReply,
            })
        )
        await firebasePostsService.addLikeToReply({
            postID: currentPost?.id,
            commentID: comment.commentID,
            replyUserID: loggedInUserID,
            replyID: currReply.replyID,
        })
    }

    const handleLike = async (): Promise<void> => {
        if (currentPost?.id === undefined) {
            return
        }

        dispatch(
            likeDislikeComment({
                postID: currentPost.id,
                commentID: comment.commentID,
                userID: loggedInUserID,
            })
        )
        try {
            await firebasePostsService.addLikeToComment(
                currentPost.id,
                comment.commentID,
                loggedInUserID
            )
        } catch (err) {
            setError('Something went wrong')
        }
    }

    const navigate = useNavigate()
    return (
        <Box>
            <ListItem sx={{ justifyContent: 'space-between' }}>
                <Stack direction="row" alignItems="center">
                    <Avatar
                        onClick={() =>
                            navigate(
                                `/profile/${currentCommentCreator?.authID}`
                            )
                        }
                        alt="Profile picture of the user"
                        src={
                            currentCommentCreator
                                ? currentCommentCreator?.profileImage
                                : '/broken-image.jpg'
                        }
                    />
                    <Typography
                        variant="body2"
                        component="h6"
                        sx={{
                            color: 'text.primary',
                            fontWeight: '600',
                            marginTop: '4px',
                            marginLeft: '10px',
                        }}
                    >
                        {comment.commentator}
                        <Typography
                            variant="body2"
                            component="p"
                            sx={{
                                color: 'text.primary',
                                fontWeight: '400',
                                marginTop: '4px',
                                marginLeft: '5px',
                                display: 'inline',
                                wordBreak: 'break-all',
                            }}
                        >
                            {comment.comment}
                        </Typography>
                    </Typography>
                    {error && (
                        <Typography sx={{ color: 'red' }}>{error}</Typography>
                    )}
                </Stack>

                {!hasBeenLikedByCurrentUser && (
                    <IconButton
                        onClick={handleLike}
                        sx={{
                            alignSelf: 'flex-end',
                        }}
                    >
                        <FavoriteBorderIcon
                            fontSize="medium"
                            sx={{ color: 'text.primary' }}
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
            </ListItem>

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
                    {currentCommentUsersLikes.map((currentUser) => (
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
                                    color: 'text.primary',
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

            <Stack direction="row" spacing={3} sx={{ marginLeft: '65px' }}>
                <Typography sx={{ cursor: 'pointer' }} onClick={showLikes}>
                    {comment.likes.length} харесвания
                </Typography>
                <Typography onClick={handleReply}>Отговор</Typography>
            </Stack>

            {comment.replies?.map((currReply) => {
                const currReplyUser = allUsers.find(
                    (userMapped) => userMapped.authID === currReply.replyUserID
                )
                const replyHasBeenLikedByCurrentUser =
                    currReply.replyLikes.includes(loggedInUserID)

                const usersLikedTheReply = allUsers.filter((currUser) =>
                    currReply.replyLikes.includes(currUser.authID)
                )
                return (
                    <React.Fragment key={currReply.replyID}>
                        <ListItem
                            sx={{
                                justifyContent: 'space-between',
                                paddingLeft: '50px',
                            }}
                        >
                            <Stack direction="row" alignItems="center">
                                <Avatar
                                    sx={{
                                        height: '30px',
                                        width: '30px',
                                    }}
                                    onClick={() =>
                                        navigate(
                                            `/profile/${currReplyUser?.authID}`
                                        )
                                    }
                                    alt="Profile picture of the user"
                                    src={
                                        currReplyUser
                                            ? currReplyUser?.profileImage
                                            : '/broken-image.jpg'
                                    }
                                />
                                <Typography
                                    variant="body2"
                                    component="h6"
                                    sx={{
                                        color: 'text.primary',
                                        fontWeight: '600',
                                        marginTop: '4px',
                                        marginLeft: '10px',
                                    }}
                                >
                                    {currReply.replier}
                                    <Typography
                                        variant="body2"
                                        component="p"
                                        sx={{
                                            color: 'text.primary',
                                            fontWeight: '400',
                                            marginTop: '4px',
                                            marginLeft: '5px',
                                            display: 'inline',
                                            wordBreak: 'break-all',
                                        }}
                                    >
                                        {currReply.reply}
                                    </Typography>
                                </Typography>
                            </Stack>
                            {!replyHasBeenLikedByCurrentUser && (
                                <IconButton
                                    onClick={() => handleReplyLike(currReply)}
                                    sx={{
                                        alignSelf: 'flex-end',
                                    }}
                                >
                                    <FavoriteBorderIcon
                                        fontSize="medium"
                                        sx={{
                                            color: 'text.primary',
                                        }}
                                    />
                                </IconButton>
                            )}

                            {replyHasBeenLikedByCurrentUser && (
                                <IconButton
                                    onClick={() => handleReplyLike(currReply)}
                                >
                                    <FavoriteIcon
                                        fontSize="medium"
                                        sx={{
                                            color: '#FF0000',
                                        }}
                                    />
                                </IconButton>
                            )}
                        </ListItem>

                        <Dialog
                            open={showReplyLikes}
                            onClose={handleHideReplyLikes}
                        >
                            <DialogTitle sx={{ textAlign: 'center' }}>
                                Liked by
                            </DialogTitle>

                            <IconButton
                                aria-label="close"
                                onClick={handleHideReplyLikes}
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
                                {usersLikedTheReply.map((currentUser) => (
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
                                                navigate(
                                                    `/profile/${currentUser?.authID}`
                                                )
                                            }
                                            src={currentUser?.profileImage}
                                            sx={{
                                                width: '40px',
                                                height: '40px',
                                            }}
                                        />
                                        <Typography
                                            sx={{
                                                fontWeight: 'bolder',
                                                marginBottom: '4px',
                                                color: 'text.primary',
                                            }}
                                        >
                                            {currentUser?.username ||
                                                currentUser?.fullName ||
                                                currentUser?.email.split(
                                                    '@'
                                                )[0]}
                                        </Typography>
                                    </Stack>
                                ))}
                            </DialogContent>
                        </Dialog>

                        <Stack
                            direction="row"
                            spacing={3}
                            sx={{ marginLeft: '65px' }}
                        >
                            <Typography onClick={showLikedByReplyHandler}>
                                {currReply.replyLikes.length > 0
                                    ? `${currReply.replyLikes.length}  харесвания`
                                    : null}
                            </Typography>
                        </Stack>
                    </React.Fragment>
                )
            })}
            {wantsToReply && (
                <>
                    <TextField
                        multiline
                        sx={{
                            marginLeft: '60px',
                            width: '80%',
                        }}
                        inputProps={{
                            style: {
                                padding: '8px',
                            },
                        }}
                        // eslint-disable-next-line react/jsx-no-duplicate-props
                        InputProps={{
                            style: {
                                padding: '0px',
                                paddingRight: '45px',
                            },
                        }}
                        onKeyDown={handleReplyWithKeyboard}
                        onChange={handleReplyChange}
                        value={reply}
                        placeholder="Отговори тук..."
                    />
                    <Button
                        onClick={handleSendReply}
                        variant="text"
                        sx={{
                            position: 'absolute',
                            right: '18px',
                        }}
                    >
                        Прати
                    </Button>
                </>
            )}
        </Box>
    )
}
export default memo(SingleComment)
