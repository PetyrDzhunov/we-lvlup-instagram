import ListItem from '@mui/material/ListItem'
import { useTheme } from '@mui/material/styles'

import { Post } from '../../types'
import '../../styles/single-post.css'
import { useAppSelector } from '../../hooks/redux-hooks'

import SinglePostImage from './SinglePostImage'
import SinglePostHeader from './SinglePostHeader'
import SinglePostFooter from './SinglePostFooter'

interface SinglePostProps {
    post: Post
}

function SinglePost({ post }: SinglePostProps): JSX.Element {
    const currentUser = useAppSelector((state) =>
        state.users.allUsers.find(
            (currUser) => currUser.authID === post.creator.uid
        )
    )

    const theme = useTheme()

    return (
        <ListItem
            sx={{
                display: 'flex',
                flexFlow: 'column wrap',
                width: '96%',
                margin: '20px 0',
                padding: '0px',
                backgroundColor: theme.palette.background.paper,
            }}
        >
            <SinglePostHeader
                post={post}
                profileImage={
                    currentUser?.profileImage
                        ? currentUser?.profileImage
                        : '/broken-image.jpg'
                }
                id={currentUser ? currentUser?.authID : ''}
            />
            <SinglePostImage id={post.id!} image={post.image} />
            <SinglePostFooter
                postID={post.id!}
                description={post?.description ? post.description : ''}
            />
        </ListItem>
    )
}
export default SinglePost
