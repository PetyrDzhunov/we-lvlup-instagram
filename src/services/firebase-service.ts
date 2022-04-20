import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    QuerySnapshot,
    DocumentData,
} from 'firebase/firestore/lite'
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

// generic function getFiltereResponse (collection,query)

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
    await addDoc(collection(db, 'posts'), {
        post,
    })
}

const getFilteredPosts = (posts: QuerySnapshot<DocumentData>): Post[] => {
    const allPosts: Post[] = []
    posts.forEach((post) => {
        allPosts.push({ ...post.data().post, id: post.id })
    })
    return allPosts
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
}
