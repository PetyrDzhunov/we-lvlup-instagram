import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    updateDoc,
    arrayUnion,
    doc,
    arrayRemove,
} from 'firebase/firestore/lite'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../../../config/firebase'
import { Post, Comment } from '../../../types'
import { getFilteredPosts } from './utils'

const getPostById = async (postID: string): Promise<Post[]> => {
    const q = query(collection(db, 'posts'), where('id', '==', postID))
    const posts = await getDocs(q)
    return getFilteredPosts(posts)
}

const getAllPosts = async (): Promise<Post[]> => {
    const posts = await getDocs(collection(db, 'posts'))
    return getFilteredPosts(posts)
}

const createPost = async (post: Post): Promise<void> => {
    const { comments, creator, dislikes, image, likes, description } = post
    await addDoc(collection(db, 'posts'), {
        comments,
        creator,
        dislikes,
        image,
        likes,
        description,
        id: uuidv4(),
    })
}

const addLikeToPost = async (postID: string, userID: string): Promise<void> => {
    const currentPost = await getPostById(postID)
    const currentPostDocId = currentPost[0].docID!
    const currentPostRef = doc(db, 'posts', currentPostDocId)
    if (!currentPost[0].likes.includes(userID)) {
        await updateDoc(currentPostRef, {
            likes: arrayUnion(userID),
        })
    } else {
        await updateDoc(currentPostRef, {
            likes: arrayRemove(userID),
        })
    }
}

const getAllPostsByUserID = async (uid: string): Promise<Post[]> => {
    const q = query(
        collection(db, 'posts'),
        where('post.creator.uid', '==', uid)
    )
    const posts = await getDocs(q)
    return getFilteredPosts(posts)
}

const addCommentToPost = async (
    postID: string,
    comment: Comment
): Promise<void> => {
    const currentPost = await getPostById(postID)
    const currentPostDocId = currentPost[0].docID!
    const currentPostRef = doc(db, 'posts', currentPostDocId)
    await updateDoc(currentPostRef, {
        comments: arrayUnion(comment),
    })
}

export default {
    getAllPosts,
    createPost,
    addLikeToPost,
    getAllPostsByUserID,
    getPostById,
    addCommentToPost,
}
