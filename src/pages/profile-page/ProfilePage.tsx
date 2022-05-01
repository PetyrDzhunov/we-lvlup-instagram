import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Box from '@mui/material/Box'

import '../../styles/single-post.css'
import { PageProps } from '../../types'
import PageLayout from '../../layout/PageLayout/PageLayout'
import { loadAllPosts } from '../../store/posts/postsSlice'
import { firebasePostsService } from '../../services/firebase-service'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import SinglePostImage from '../../components/SinglePost/SinglePostImage'

import ProfilePageHeader from './ProfilePageHeader'
import ProfilePageSkeleton from './ProfilePageSkeleton'

let isInitial = true

function ProfilePage({ title }: PageProps): JSX.Element {
    const navigate = useNavigate()
    const { userID } = useParams()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { isAuthenticated, uid } = useAppSelector(
        (state) => state.persistedReducer.auth
    )

    const dispatch = useAppDispatch()

    useEffect(() => {
        const getPosts = async (): Promise<void> => {
            setIsLoading(true)
            isInitial = false
            const allPosts = await firebasePostsService.getAllPosts()
            dispatch(loadAllPosts(allPosts))
            setIsLoading(false)
        }
        getPosts()
    }, [dispatch])

    const currentUserPosts = useAppSelector((state) =>
        state.posts.allPosts.filter((post) => post.creator.uid === userID)
    )

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
            <Box
                sx={{
                    marginTop: '40px',
                    marginBottom: '53px',
                    minHeight: '100vh',
                }}
            >
                <ProfilePageHeader
                    myPosts={currentUserPosts}
                    uid={userID || uid}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexFlow: 'row wrap',
                        justifyContent: 'flex-start',
                        alignContent: 'center',
                        marginTop: '20px',
                    }}
                >
                    {currentUserPosts.map((post) => (
                        <SinglePostImage
                            key={post.id}
                            id={post.id!}
                            image={post.image}
                            small
                        />
                    ))}
                </Box>
            </Box>
            {isLoading && isInitial && <ProfilePageSkeleton />}
        </PageLayout>
    )
}

export default ProfilePage
