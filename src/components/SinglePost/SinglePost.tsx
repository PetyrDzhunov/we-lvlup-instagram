import ListItem from '@mui/material/ListItem'
import { useTheme } from '@mui/material/styles'

import { useMediaQuery } from '@mui/material'
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
    const isLaptop = useMediaQuery(theme.breakpoints.up('lg'))

    return (
        <ListItem
            sx={{
                display: 'flex',
                flexFlow: 'column wrap',
                width: '96%',
                backgroundColor: theme.palette.background.paper,
                border: isLaptop ? '1px solid rgba(0,0,0,.1)' : 'none',
                marginBottom: isLaptop ? '12px' : '0px',
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
