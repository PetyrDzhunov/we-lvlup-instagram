import ListItem from '@mui/material/ListItem'
import { DocumentData } from 'firebase/firestore/lite'
import { useEffect, useState } from 'react'
import SinglePostHeader from './SinglePostHeader'
import { Post } from '../types'
import '../styles/single-post.css'
import SinglePostFooter from './SinglePostFooter'
import SinglePostImage from './SinglePostImage'
import { firebaseService } from '../services/firebase-service'

interface SinglePostProps {
    post: Post
}

function SinglePost({ post }: SinglePostProps): JSX.Element {
    const [user, setUser] = useState<DocumentData>()

    useEffect(() => {
        const getUser = async (): Promise<void> => {
            const currentUser = await firebaseService.getUserById(
                post.creator.uid
            )
            setUser(currentUser)
        }
        getUser()
    }, [post.creator.uid])

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
                    user?.profileImage
                        ? user?.profileImage
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
