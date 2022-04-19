import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import { Post } from '../types'
import '../styles/single-post.css'
import stringAvatar from '../utils/stringToColor'

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
            <Stack direction="row" spacing={2}>
                <Avatar {...stringAvatar(post.creator.email)} />
                <Typography sx={{ fontWeight: 'bolder', marginBottom: '4px' }}>
                    {post.creator.email}
                </Typography>
            </Stack>

            <img src={post.image} alt="" className="single-post__image" />
        </ListItem>
    )
}
export default SinglePost
