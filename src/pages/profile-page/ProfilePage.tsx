import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import SinglePostImage from '../../components/SinglePostImage'
import { useAppSelector } from '../../hooks/redux-hooks'
import PageLayout from '../../layout/PageLayout/PageLayout'
import { firebaseService } from '../../services/firebase-service'
import { PageProps, Post } from '../../types'
import ProfilePageHeader from './ProfilePageHeader'

function ProfilePage({ title }: PageProps): JSX.Element {
    const navigate = useNavigate()
    const [currentUserPosts, setCurrentUserPosts] = useState<Post[]>([])

    const { isAuthenticated, uid, email, fullName } = useAppSelector(
        (state) => state.persistedReducer.auth
    )

    useEffect(() => {
        const getMyPosts = async (): Promise<void> => {
            try {
                const posts = await firebaseService.getAllPostsByUserID(uid)
                setCurrentUserPosts(posts)
            } catch (err) {
                console.log(err)
            }
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
        </PageLayout>
    )
}

export default ProfilePage
