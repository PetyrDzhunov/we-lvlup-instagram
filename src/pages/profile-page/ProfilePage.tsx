import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import SinglePostImage from '../../components/SinglePostImage'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import PageLayout from '../../layout/PageLayout/PageLayout'
import { PageProps } from '../../types'
import ProfilePageHeader from './ProfilePageHeader'
import '../../styles/single-post.css'
import ProfilePageSkeleton from './ProfilePageSkeleton'
import { loadAllPosts } from '../../store/posts/postsSlice'
import { firebaseService } from '../../services/firebase-service'

function ProfilePage({ title }: PageProps): JSX.Element {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { isAuthenticated, uid, email, fullName } = useAppSelector(
        (state) => state.persistedReducer.auth
    )

    const dispatch = useAppDispatch()

    useEffect(() => {
        const getPosts = async (): Promise<void> => {
            setIsLoading(true)
            const allPosts = await firebaseService.getAllPosts()
            dispatch(loadAllPosts(allPosts))
            setIsLoading(false)
        }
        getPosts()
    }, [dispatch])

    const currentUserPosts = useAppSelector((state) =>
        state.posts.allPosts.filter((post) => post.creator.uid === uid)
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
            <Box>
                <ProfilePageHeader
                    email={email}
                    fullName={fullName}
                    myPosts={currentUserPosts}
                    uid={uid}
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
                            image={post.image}
                            small
                        />
                    ))}
                </Box>
            </Box>
            {isLoading && <ProfilePageSkeleton />}
        </PageLayout>
    )
}

export default ProfilePage
