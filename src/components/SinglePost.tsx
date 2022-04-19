import ListItem from '@mui/material/ListItem'
import SinglePostHeader from './SinglePostHeader'
import { Post } from '../types'
import '../styles/single-post.css'
import SinglePostFooter from './SinglePostFooter'

interface SinglePostProps {
    post: Post
}

function SinglePost({ post }: SinglePostProps): JSX.Element {
    return (
        <ListItem
            sx={{
                display: 'flex',
                flexFlow: 'column wrap',
                width: '100%',
                margin: '20px auto',
                padding: '0px',
            }}
        >
            <SinglePostHeader creator={post.creator.email} />
            <img src={post.image} alt="" className="single-post__image" />
            <SinglePostFooter likes={post.likes.length} />
        </ListItem>
    )
}
export default SinglePost
