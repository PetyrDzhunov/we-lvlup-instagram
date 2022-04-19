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
    authID: string,
    username: string
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
    // check in the users collection if there's an authID === id we sending if it is don't add him to to db
    const q = query(collection(db, 'users'), where('authID', '==', id))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
        // if there's no user found with that query it's ok to add the user in the users collection
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
}
