import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate, useParams } from 'react-router-dom'
import SinglePost from '../../components/SinglePost'
import { useAppSelector } from '../../hooks/redux-hooks'
import PageLayout from '../../layout/PageLayout/PageLayout'
import { PageProps } from '../../types'

function PostPage({ title }: PageProps): JSX.Element {
    const { isAuthenticated } = useAppSelector(
        (state) => state.persistedReducer.auth
    )
    const { postID } = useParams()
    const currentPost = useAppSelector((state) =>
        state.posts.allPosts.find((post) => post.id === postID)
    )
    const navigate = useNavigate()
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
            <SinglePost key={currentPost?.id} post={currentPost!} />
        </PageLayout>
    )
}
export default PostPage
