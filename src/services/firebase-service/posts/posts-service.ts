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
    serverTimestamp,
    orderBy,
} from 'firebase/firestore/lite'
import { v4 as uuidv4 } from 'uuid'

import { db } from '../../../config/firebase'
import { Post, Comment, Reply } from '../../../types'

import { getFilteredPosts } from './utils'

const getPostById = async (postID: string): Promise<Post[]> => {
    const q = query(collection(db, 'posts'), where('id', '==', postID))
    const posts = await getDocs(q)
    return getFilteredPosts(posts)
}

const getAllPosts = async (): Promise<Post[]> => {
    const q = query(collection(db, 'posts'), orderBy('created', 'desc'))
    const posts = await getDocs(q)
    // return ordered by timestamp
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
        created: serverTimestamp(),
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

    await updateDoc(currentPostRef, {
        ...currentPost[0],
        likedBy: newLikes,
    })
}

const addReplyToComment = async ({
    postID,
    replyUserID,
    commentID,
    reply,
    replier,
    replyID,
    replyLikes,
}: Reply): Promise<void> => {
    if (postID === undefined) {
        return
    }
    const currentPost = await getPostById(postID)
    const currentPostDocId = currentPost[0].docID!
    const currentPostRef = doc(db, 'posts', currentPostDocId)
    const commentToAddReplyTo = currentPost[0].comments.find(
        (currComment) => currComment.commentID === commentID
    )

    const newReplies = commentToAddReplyTo?.replies
    newReplies?.push({
        replyUserID,
        reply,
        replyID,
        replier,
        commentID,
        replyLikes,
    })

    await updateDoc(currentPostRef, {
        ...currentPost[0],
        replies: newReplies,
    })
}

const addLikeToReply = async ({
    postID,
    commentID,
    replyUserID,
    replyID,
}: {
    postID: string
    commentID: string
    replyUserID: string
    replyID: string
}): Promise<void> => {
    const currentPost = await getPostById(postID)
    const currentPostDocId = currentPost[0].docID!
    const currentPostRef = doc(db, 'posts', currentPostDocId)
    const commentToAddReplyTo = currentPost[0].comments.find(
        (currComment) => currComment.commentID === commentID
    )
    if (!commentToAddReplyTo === undefined) {
        return
    }
    const currentReply = commentToAddReplyTo?.replies?.find(
        (currReply) => currReply.replyID === replyID
    )

    const newReplyLikes = currentReply?.replyLikes

    if (!newReplyLikes?.includes(replyUserID)) {
        newReplyLikes?.push(replyUserID)
    } else {
        const indexOfUserID = newReplyLikes?.indexOf(replyUserID)
        newReplyLikes.splice(indexOfUserID!, 1)
    }

    await updateDoc(currentPostRef, {
        ...currentPost[0],
        replyLikes: newReplyLikes,
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
    addReplyToComment,
    addLikeToReply,
}
