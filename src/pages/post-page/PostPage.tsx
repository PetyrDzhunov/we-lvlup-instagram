/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate, useParams } from 'react-router-dom'
import Picker from 'emoji-picker-react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import { v4 as uuidv4 } from 'uuid'
import SinglePost from '../../components/SinglePost'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import PageLayout from '../../layout/PageLayout/PageLayout'
import { PageProps } from '../../types'
import '../../styles/post-page.css'
import { addComment } from '../../store/posts/postsSlice'
import { firebasePostsService } from '../../services/firebase-service'
import SingleComment from './SingleComment'

function PostPage({ title }: PageProps): JSX.Element {
    const [comment, setComment] = useState('')
    const [showPicker, setShowPicker] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useAppDispatch()

    const onEmojiClick = (
        event: React.MouseEvent<Element, MouseEvent>,
        emojiObject: any
    ): void => {
        setComment((prevInput) => prevInput + emojiObject.emoji)
        setShowPicker(false)
    }
    const { postID } = useParams()

    const { isAuthenticated, uid } = useAppSelector(
        (state) => state.persistedReducer.auth
    )

    const currentPost = useAppSelector((state) =>
        state.posts.allPosts.find((post) => post.id === postID)
    )

    const loggedUser = useAppSelector((state) =>
        state.users.allUsers.find((user) => user.authID === uid)
    )

    const addCommentHandler = async (): Promise<void> => {
        if (loggedUser === undefined) {
            return
        }

        if (postID === undefined) {
            return
        }

        const newComment = {
            comment,
            commentator: loggedUser?.username || loggedUser.email.split('@')[0],
            id: postID,
            commentatorID: loggedUser.authID,
            commentID: uuidv4(),
        }
        // dispatch action for adding new comment to the current post
        dispatch(addComment(newComment))

        // add the comment to the current post in the database
        try {
            await firebasePostsService.addCommentToPost(postID, newComment)
        } catch (err) {
            setError('Something went wrong.')
        }

        setComment('')
    }

    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuthenticated) {
            return navigate('/')
        }
    }, [isAuthenticated, navigate])

    return (
        <PageLayout>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <SinglePost key={currentPost?.id} post={currentPost!} />
            <Box className="picker-container">
                <input
                    className="comment-input"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Добави коментар..."
                />
                <img
                    alt=""
                    className="emoji-icon"
                    src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                    onClick={() => setShowPicker((val) => !val)}
                />
                {showPicker && (
                    <Picker
                        pickerStyle={{ width: '100%' }}
                        onEmojiClick={onEmojiClick}
                    />
                )}
                <Button
                    onClick={addCommentHandler}
                    variant="text"
                    sx={{
                        position: 'absolute',
                        top: '8px',
                        right: '-40px',
                        verticalAlign: 'center',
                        fontSize: '0.75em',
                    }}
                >
                    Публикуване
                </Button>
            </Box>
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
            <List>
                {currentPost?.comments?.map((currComment) => (
                    <SingleComment
                        key={currComment.commentID}
                        comment={currComment}
                    />
                ))}
            </List>
        </PageLayout>
    )
}
export default PostPage
