import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import {
    collection,
    DocumentData,
    QuerySnapshot,
    onSnapshot,
    query,
} from 'firebase/firestore'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'

import PageLayout from '../../layout/PageLayout/PageLayout'
import {
    firebasePostsService,
    firebaseUsersService,
} from '../../services/firebase-service'
import SinglePost from '../../components/SinglePost/SinglePost'
import { loadAllPosts } from '../../store/posts/postsSlice'
import { loadAllUsers } from '../../store/users/usersSlice'
import { PageProps, User } from '../../types'

import PostsSkeleton from './PostsSkeleton'
import SingleStory from './SingleStory'
import LoggedInUserStory from './LoggedInUserStory'
import { db } from '../../config/firebase'

let isInitial = true

function HomePage({ title }: PageProps): JSX.Element {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const theme = useTheme()
    const isBiggerThanSmall = useMediaQuery(theme.breakpoints.up('sm'))
    const isLaptop = useMediaQuery(theme.breakpoints.up('lg'))

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

    useEffect(() => {
        const q = query(collection(db, 'users'))
        const unsubscribe = onSnapshot(
            q,
            (querySnapshot: QuerySnapshot<DocumentData>) => {
                const allUsers: User[] = []
                querySnapshot.forEach((doc) => {
                    allUsers.push(doc.data() as User)
                })
                dispatch(loadAllUsers(allUsers))
            }
        )
        return () => {
            unsubscribe()
        }
    }, [dispatch])

    const allPosts = useAppSelector((state) => state.posts.allPosts)
    const allUsers = useAppSelector((state) => state.users.allUsers)

    const usersWithStories = allUsers.filter((currUser) => currUser.story)
    return (
        <PageLayout>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Box
                sx={{
                    marginBottom: '56px',
                    marginTop: '25px',
                    width: isLaptop ? '50%' : '100%',
                    margin: isLaptop
                        ? '25px auto 56px auto'
                        : '25px 0px 56px 0px',
                }}
            >
                {!isInitial && (
                    <Box
                        sx={{
                            marginLeft: '0px',
                            display: 'flex',
                            flexFlow: 'row nowrap',
                            bgcolor: 'background.paper',
                            paddingBottom: '8px',
                            overflowX: 'auto',
                            paddingTop: isBiggerThanSmall ? '12px' : '0px',
                        }}
                    >
                        <LoggedInUserStory />
                        {usersWithStories.map((user) => (
                            <SingleStory key={user.authID} user={user} />
                        ))}
                    </Box>
                )}
                {isLoading && isInitial && <PostsSkeleton />}
                <List
                    sx={{
                        bgcolor: 'background.paper',
                        padding: '0px',
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
