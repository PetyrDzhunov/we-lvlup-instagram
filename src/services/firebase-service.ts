import { collection, addDoc } from 'firebase/firestore/lite'
import { db } from '../config/firebase'

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

const addUserToFirebaseDBLoggedInWithFacebook = async (
    email: string | null,
    authID: string | null
): Promise<void> => {
    await addDoc(collection(db, 'users'), {
        email,
        authID,
        followers: [],
    })
}

export const firebaseService = {
    addUserToFirebaseDB,
    addUserToFirebaseDBLoggedInWithFacebook,
}
