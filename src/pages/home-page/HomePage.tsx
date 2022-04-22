import Box from '@mui/material/Box'
import List from '@mui/material/List'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import SinglePost from '../../components/SinglePost'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import PageLayout from '../../layout/PageLayout/PageLayout'
import { firebaseService } from '../../services/firebase-service'
import { loadAllPosts } from '../../store/posts/postsSlice'
import { PageProps, Post } from '../../types'
import PostsSkeleton from './PostsSkeleton'

function HomePage({ title }: PageProps): JSX.Element {
    const navigate = useNavigate()
    const [posts, setPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const isAuthenticated = useAppSelector(
        (state) => state.persistedReducer.auth.isAuthenticated
    )
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isAuthenticated) {
            return navigate('/')
        }
    }, [isAuthenticated, navigate])

    useEffect(() => {
        const getPosts = async (): Promise<void> => {
            setIsLoading(true)
            const allPosts = await firebaseService.getAllPosts()
            setPosts(allPosts)
            dispatch(loadAllPosts(allPosts))
            setIsLoading(false)
        }
        getPosts()
    }, [dispatch])
    return (
        <PageLayout>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Box>
                {isLoading && <PostsSkeleton />}
                <List sx={{ padding: '0px', marginTop: '70px' }}>
                    {posts.map((post) => (
                        <SinglePost key={post.id} post={post} />
                    ))}
                </List>
            </Box>
        </PageLayout>
    )
}

export default HomePage
