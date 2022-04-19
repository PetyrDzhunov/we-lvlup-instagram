import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import SinglePostImage from '../../components/SinglePostImage'
import { useAppSelector } from '../../hooks/redux-hooks'
import PageLayout from '../../layout/PageLayout/PageLayout'
import { firebaseService } from '../../services/firebase-service'
import { PageProps, Post } from '../../types'
import ProfilePageHeader from './ProfilePageHeader'
import '../../styles/single-post.css'

function ProfilePage({ title }: PageProps): JSX.Element {
    const navigate = useNavigate()
    const [currentUserPosts, setCurrentUserPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { isAuthenticated, uid, email, fullName } = useAppSelector(
        (state) => state.persistedReducer.auth
    )

    useEffect(() => {
        const getMyPosts = async (): Promise<void> => {
            setIsLoading(true)
            try {
                const posts = await firebaseService.getAllPostsByUserID(uid)
                setCurrentUserPosts(posts)
            } catch (err) {
                console.log(err)
            }
            setIsLoading(false)
        }
        getMyPosts()
    }, [uid])

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
            {isLoading && (
                <Stack
                    sx={{ marginLeft: '15px' }}
                    spacing={2}
                    direction="column"
                    justifyContent="center"
                >
                    <Stack direction="row" spacing={2}>
                        <Skeleton
                            variant="rectangular"
                            width="40%"
                            height={120}
                        />
                        <Skeleton
                            variant="rectangular"
                            width="40%"
                            height={120}
                        />
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Skeleton
                            variant="rectangular"
                            width="40%"
                            height={120}
                        />
                        <Skeleton
                            variant="rectangular"
                            width="40%"
                            height={120}
                        />
                    </Stack>
                </Stack>
            )}
        </PageLayout>
    )
}

export default ProfilePage
