import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks'
import PageLayout from '../../layout/PageLayout/PageLayout'
import { firebaseService } from '../../services/firebase-service'
import { PageProps, Post } from '../../types'

function HomePage({ title }: PageProps): JSX.Element {
    const navigate = useNavigate()
    const [posts, setPosts] = useState<Post[]>([])

    const isAuthenticated = useAppSelector(
        (state) => state.persistedReducer.auth.isAuthenticated
    )

    useEffect(() => {
        const getPosts = async (): Promise<void> => {
            const allPosts = await firebaseService.getAllPosts()
            setPosts(allPosts)
        }
        getPosts()
    })

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
            <Box>{posts.map((post) => console.log(post))}</Box>
        </PageLayout>
    )
}

export default HomePage
