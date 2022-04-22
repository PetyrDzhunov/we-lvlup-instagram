import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    QuerySnapshot,
    DocumentData,
    updateDoc,
    arrayUnion,
    doc,
    arrayRemove,
} from 'firebase/firestore/lite'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../config/firebase'
import { Post } from '../types'

const addUserToFirebaseDB = async (
    email: string,
    fullName: string,
    username: string,
    authID: string
): Promise<void> => {
    await addDoc(collection(db, 'users'), {
        email,
        fullName,
        username,
        authID,
        followers: [],
    })
}

const checkIfUserExistsInDb = async (id: string): Promise<boolean> => {
    const q = query(collection(db, 'users'), where('authID', '==', id))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
        return true
    }
    return false
}

const addUserToFirebaseDBLoggedInWithFacebook = async (
    email: string | null,
    authID: string
): Promise<void> => {
    const userIsNotExisting = await checkIfUserExistsInDb(authID)
    if (userIsNotExisting) {
        await addDoc(collection(db, 'users'), {
            email,
            authID,
            followers: [],
        })
    }
}
const getFilteredPosts = (posts: QuerySnapshot<DocumentData>): Post[] => {
    const allPosts: Post[] = []
    posts.forEach((post) => {
        if (post.exists()) {
            allPosts.push({ ...post.data(), docID: post.id } as Post)
        }
    })
    return allPosts
}

// generic function getFiltereResponse (collection,query)
const getPostById = async (postID: string): Promise<Post[]> => {
    const q = query(collection(db, 'posts'), where('id', '==', postID))
    const posts = await getDocs(q)
    return getFilteredPosts(posts)
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

const getUserById = async (id: string): Promise<DocumentData> => {
    const q = query(collection(db, 'users'), where('authID', '==', id))
    const users = await getDocs(q)
    let currentUser: any
    users.forEach((user) => {
        currentUser = { ...user.data(), docID: user.id }
    })
    return currentUser
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

const getAllPosts = async (): Promise<Post[]> => {
    const posts = await getDocs(collection(db, 'posts'))
    return getFilteredPosts(posts)
}

const getAllPostsByUserID = async (uid: string): Promise<Post[]> => {
    const q = query(
        collection(db, 'posts'),
        where('post.creator.uid', '==', uid)
    )
    const posts = await getDocs(q)
    return getFilteredPosts(posts)
}

export const firebaseService = {
    addUserToFirebaseDB,
    addUserToFirebaseDBLoggedInWithFacebook,
    createPost,
    getAllPosts,
    getAllPostsByUserID,
    getUserById,
    addLikeToPost,
    getPostById,
}
