import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import '../../styles/post-page.css'
import { PageProps } from '../../types'
import NotFoundPage from '../not-found-page/NotFoundPage'
import { addComment } from '../../store/posts/postsSlice'
import PageLayout from '../../layout/PageLayout/PageLayout'
import SinglePost from '../../components/SinglePost/SinglePost'
import { firebasePostsService } from '../../services/firebase-service'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'

import SingleComment from './SingleComment'

function PostPage({ title }: PageProps): JSX.Element {
    const [open, setOpen] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [comment, setComment] = useState<string>('')

    const navigate = useNavigate()

    const { isAuthenticated, uid } = useAppSelector(
        (state) => state.persistedReducer.auth
    )

    useEffect(() => {
        if (!isAuthenticated) {
            return navigate('/')
        }
    }, [isAuthenticated, navigate])

    const dispatch = useAppDispatch()
    const { postID } = useParams()

    const loggedUser = useAppSelector((state) =>
        state.users.allUsers.find((user) => user.authID === uid)
    )

    const currentPost = useAppSelector((state) =>
        state.posts.allPosts.find((post) => post.id === postID)
    )

    const currentTheme = useAppSelector(
        (state) => state.persistedReducer.auth.theme
    )

    if (!currentPost) {
        return <NotFoundPage />
    }

    const addCommentHandler = async (): Promise<void> => {
        if (loggedUser === undefined) {
            return
        }

        if (postID === undefined) {
            return
        }

        if (comment === '') {
            setOpen(true)
            return setError('Коментарът не може да бъде празен')
        }

        const newComment = {
            comment,
            commentator: loggedUser?.username || loggedUser.email.split('@')[0],
            id: postID,
            commentatorID: loggedUser.authID,
            commentID: uuidv4(),
            replies: [],
            likes: [],
        }
        dispatch(addComment(newComment))
        setComment('')

        try {
            await firebasePostsService.addCommentToPost(postID, newComment)
        } catch (err) {
            setError('Something went wrong.')
        }
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

    return (
        <PageLayout>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    marginTop: '56px',
                    marginBottom: '50px',
                    minHeight: '100vh',
                }}
            >
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <SinglePost key={currentPost.id} post={currentPost} />
                <Box
                    className={
                        currentTheme === 'light'
                            ? 'picker-container light'
                            : 'picker-container dark'
                    }
                >
                    <input
                        className={
                            currentTheme === 'light'
                                ? 'comment-input comment-input-light'
                                : 'comment-input comment-input-dark'
                        }
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Добави коментар..."
                    />
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
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity="error"
                        sx={{ width: '100%' }}
                    >
                        {error}
                    </Alert>
                </Snackbar>
                <List sx={{ bgcolor: 'background.paper' }}>
                    {currentPost?.comments.length > 0 &&
                        currentPost?.comments?.map((currComment) => (
                            <SingleComment
                                key={currComment.commentID}
                                comment={currComment}
                            />
                        ))}
                </List>
            </Box>
        </PageLayout>
    )
}
export default PostPage
