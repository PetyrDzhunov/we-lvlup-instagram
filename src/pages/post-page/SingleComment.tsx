import { Box, IconButton, Stack } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
// import { useAppSelector } from '../../hooks/redux-hooks'
import { Comment } from '../../types'
import { firebasePostsService } from '../../services/firebase-service'
import { likeDislikeComment } from '../../store/posts/postsSlice'

interface SingleCommentProps {
    comment: Comment
}

function SingleComment({ comment }: SingleCommentProps): JSX.Element {
    const [error, setError] = useState<string>('')
    const currentCommentCreator = useAppSelector((state) => {
        return state.users.allUsers.find(
            (currUser) => currUser.authID === comment.commentatorID
        )
    })

    const dispatch = useAppDispatch()

    const currentPost = useAppSelector((state) =>
        state.posts.allPosts.find((post) => post.comments.includes(comment))
    )

    const loggedInUserID = useAppSelector(
        (state) => state.persistedReducer.auth.uid
    )

    const hasBeenLikedByCurrentUser = comment?.likes.some(
        (like) => like === loggedInUserID
    )

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
            <Stack direction="row" spacing={3} sx={{ marginLeft: '65px' }}>
                <Typography>{comment.likes.length} харесвания</Typography>
                <Typography>Отговор</Typography>
            </Stack>
        </Box>
    )
}
export default SingleComment
