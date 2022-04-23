import ListItem from '@mui/material/ListItem'
import SinglePostHeader from './SinglePostHeader'
import { Post } from '../types'
import '../styles/single-post.css'
import SinglePostFooter from './SinglePostFooter'
import SinglePostImage from './SinglePostImage'
import { useAppSelector } from '../hooks/redux-hooks'

interface SinglePostProps {
    post: Post
}

function SinglePost({ post }: SinglePostProps): JSX.Element {
    const currentUser = useAppSelector((state) =>
        state.users.allUsers.find(
            (currUser) => currUser.authID === post.creator.uid
        )
    )

    return (
        <ListItem
            sx={{
                display: 'flex',
                flexFlow: 'column wrap',
                width: '96%',
                margin: '20px 0',
                padding: '0px',
            }}
        >
            <SinglePostHeader
                creator={post.creator.email}
                profileImage={
                    currentUser?.profileImage
                        ? currentUser?.profileImage
                        : '/broken-image.jpg'
                }
            />
            <SinglePostImage image={post.image} />
            <SinglePostFooter
                postID={post.id!}
                description={post?.description ? post.description : ''}
            />
        </ListItem>
    )
}
export default SinglePost
