import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import List from '@mui/material/List'

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import PageLayout from '../../layout/PageLayout/PageLayout'
import {
    firebasePostsService,
    firebaseUsersService,
} from '../../services/firebase-service'
import SinglePost from '../../components/SinglePost/SinglePost'
import { loadAllPosts } from '../../store/posts/postsSlice'
import { loadAllUsers } from '../../store/users/usersSlice'
import { PageProps } from '../../types'

import PostsSkeleton from './PostsSkeleton'

let isInitial = true

function HomePage({ title }: PageProps): JSX.Element {
    const navigate = useNavigate()
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
            const allPosts = await firebasePostsService.getAllPosts()
            const allUsers = await firebaseUsersService.getAllUsers()
            dispatch(loadAllPosts(allPosts))
            dispatch(loadAllUsers(allUsers))
            isInitial = false
            setIsLoading(false)
        }
        getPosts()
    }, [dispatch])
    const allPosts = useAppSelector((state) => state.posts.allPosts)
    return (
        <PageLayout>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Box
                sx={{
                    marginTop: '-14px',
                    marginBottom: '56px',
                }}
            >
                {isLoading && isInitial && <PostsSkeleton />}
                <List
                    sx={{
                        bgcolor: 'background.paper',
                        padding: '0px',
                        marginTop: '70px',
                    }}
                >
                    {allPosts.map((post) => (
                        <SinglePost key={post.id} post={post} />
                    ))}
                </List>
            </Box>
        </PageLayout>
    )
}

export default HomePage
