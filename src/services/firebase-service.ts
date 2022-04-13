import { collection, addDoc } from 'firebase/firestore/lite'
import { db } from '../config/firebase'

export const addUserToFirebaseDB = async (
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

export const firebaseService = {
    addUserToFirebaseDB,
}
