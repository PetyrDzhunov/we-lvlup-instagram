import List from '@mui/material/List'

import { memo } from 'react'
import SinglePost from './SinglePost/SinglePost'
import { Post } from '../types'

interface PostListProps {
    allPosts: Post[]
}

function PostsList({ allPosts }: PostListProps): JSX.Element {
    console.log('render postsList')
    return (
        <List
            sx={{
                bgcolor: 'background.paper',
                padding: '0px',
            }}
        >
            {allPosts.map((post) => (
                <SinglePost key={post.id} post={post} />
            ))}
        </List>
    )
}

export default memo(PostsList)
