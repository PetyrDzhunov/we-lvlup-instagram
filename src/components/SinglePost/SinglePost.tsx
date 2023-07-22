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

    const loggedInUserID = useAppSelector(
        (state) => state.persistedReducer.auth.uid
    )

    const currentPostAuthor = useAppSelector((state) =>
        state.users.allUsers.find(
            (currUser) => currUser.authID === post.creator.uid
        )
    )

    const currentPostUsersLikes = useAppSelector((state) =>
        state.users.allUsers.filter((currUser) => {
            return post.likedBy.includes(currUser.authID)
        })
    )

    const hasBeenLikedByCurrentUser = post.likedBy.some(
        (like) => like === loggedInUserID
    )

    const theme = useTheme()
    const isLaptop = useMediaQuery(theme.breakpoints.up('lg'))

    return (
        <ListItem
            sx={{
                display: 'flex',
                flexFlow: 'column wrap',
                width: '100%',
                paddingBottom: '12px',
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
                loggedInUserID={loggedInUserID}
                description={post.description ? post.description : ''}
                author={currentPostAuthor!}
                likes={currentPostUsersLikes}
                liked={hasBeenLikedByCurrentUser}
                postID={post.id!}
                post={post}
            />
        </ListItem>
    )
}
export default SinglePost
