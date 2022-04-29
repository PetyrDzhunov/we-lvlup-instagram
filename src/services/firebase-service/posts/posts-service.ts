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
    const { comments, creator, dislikes, image, likedBy, description } = post
    await addDoc(collection(db, 'posts'), {
        comments,
        creator,
        dislikes,
        image,
        likedBy,
        description,
        id: uuidv4(),
    })
}

const addLikeToPost = async (postID: string, userID: string): Promise<void> => {
    const currentPost = await getPostById(postID)
    const currentPostDocId = currentPost[0].docID!
    const currentPostRef = doc(db, 'posts', currentPostDocId)
    if (!currentPost[0].likedBy.includes(userID)) {
        await updateDoc(currentPostRef, {
            likedBy: arrayUnion(userID),
        })
    } else {
        await updateDoc(currentPostRef, {
            likedBy: arrayRemove(userID),
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

const addLikeToComment = async (
    postID: string,
    commentID: string,
    userID: string
): Promise<void> => {
    const currentPost = await getPostById(postID)
    const currentPostDocId = currentPost[0].docID!
    const currentPostRef = doc(db, 'posts', currentPostDocId)
    const commentToAddLikeTo = currentPost[0].comments.find(
        (currComment) => currComment.commentID === commentID
    )
    const newLikes = commentToAddLikeTo?.likes

    if (!commentToAddLikeTo?.likes.includes(userID)) {
        newLikes?.push(userID)
    } else {
        const indexOfUserID = newLikes?.indexOf(userID)
        newLikes?.splice(indexOfUserID!, 1)
    }

    currentPost[0].comments.likes! = newLikes

    await updateDoc(currentPostRef, {
        ...currentPost[0],
        likes: newLikes,
    })
}

export default {
    getAllPosts,
    createPost,
    addLikeToPost,
    getAllPostsByUserID,
    getPostById,
    addCommentToPost,
    addLikeToComment,
}
