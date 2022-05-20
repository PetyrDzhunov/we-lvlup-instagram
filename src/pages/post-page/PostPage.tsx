import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import '../../styles/post-page.css'
import { TextField, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { PageProps } from '../../types'
import NotFoundPage from '../not-found-page/NotFoundPage'
import { addComment } from '../../store/posts/postsSlice'
import PageLayout from '../../layout/PageLayout/PageLayout'
import SinglePost from '../../components/SinglePost/SinglePost'
import { firebasePostsService } from '../../services/firebase-service'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'

import SingleComment from './SingleComment'
import FlexBoxCentered from '../../components/FlexBoxCentered'

function PostPage({ title }: PageProps): JSX.Element {
    const [open, setOpen] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const commentInputRef = useRef<HTMLInputElement | undefined>()
    const bottomRef = useRef<HTMLDivElement | null>(null)
    console.log('render post page')

    const navigate = useNavigate()

    const { isAuthenticated, uid } = useAppSelector(
        (state) => state.persistedReducer.auth
    )
    const theme = useTheme()
    const isLaptop = useMediaQuery(theme.breakpoints.up('lg'))

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

        const comment = commentInputRef?.current?.value
        if (comment == null || comment === undefined) {
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
        if (
            commentInputRef === undefined ||
            commentInputRef.current === undefined ||
            commentInputRef.current.value === undefined
        ) {
            return
        }
        commentInputRef.current.value = ''
        bottomRef.current?.scrollIntoView()

        try {
            await firebasePostsService.addCommentToPost(postID, newComment)
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
        } catch (err) {
            setError('Something went wrong.')
        }
    }

    const addCommentByKeyboard = async (
        event: React.KeyboardEvent
    ): Promise<void> => {
        if (loggedUser === undefined) {
            return
        }

        if (postID === undefined) {
            return
        }

        const comment = commentInputRef?.current?.value
        if (comment == null || comment === undefined) {
            return
        }

        let newComment
        if (event.key === 'Enter') {
            event.preventDefault()
            if (postID === undefined) {
                return
            }

            if (comment === '') {
                setOpen(true)
                return setError('Коментарът не може да бъде празен')
            }

            newComment = {
                comment,
                commentator:
                    loggedUser?.username || loggedUser.email.split('@')[0],
                id: postID,
                commentatorID: loggedUser.authID,
                commentID: uuidv4(),
                replies: [],
                likes: [],
            }
            dispatch(addComment(newComment))
            if (
                commentInputRef === undefined ||
                commentInputRef.current === undefined ||
                commentInputRef.current.value === undefined
            ) {
                return
            }
            commentInputRef.current.value = ''
        }
        if (newComment === undefined) {
            return
        }

        try {
            await firebasePostsService.addCommentToPost(postID, newComment)
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
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
                    height: '100%',
                    width: isLaptop ? '50%' : '100%',
                    margin: isLaptop
                        ? '56px auto 0px auto'
                        : '56px 0px 50px 0px',
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
                    <FlexBoxCentered flexDirection="row wrap">
                        <TextField
                            inputRef={commentInputRef}
                            multiline
                            size="small"
                            sx={{
                                marginBottom: '10px',
                                width: '100%',
                            }}
                            onKeyDown={addCommentByKeyboard}
                            placeholder="Добави коментар..."
                        />
                        <Button
                            onClick={addCommentHandler}
                            variant="text"
                            sx={{
                                fontSize: '0.75em',
                            }}
                        >
                            Публикуване
                        </Button>
                    </FlexBoxCentered>
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
                <List
                    sx={{ bgcolor: 'background.paper', paddingBottom: '15%' }}
                >
                    {currentPost?.comments.length > 0 &&
                        currentPost?.comments?.map((currComment) => (
                            <SingleComment
                                key={currComment.commentID}
                                comment={currComment}
                            />
                        ))}
                </List>
                <div ref={bottomRef} />
            </Box>
        </PageLayout>
    )
}
export default PostPage
