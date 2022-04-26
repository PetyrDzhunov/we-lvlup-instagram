import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    DocumentData,
} from 'firebase/firestore/lite'
import { db } from '../../../config/firebase'
import { User } from '../../../types'
import { getFilteredUsers, checkIfUserExistsInDb } from './utils'

const getAllUsers = async (): Promise<User[]> => {
    const users = await getDocs(collection(db, 'users'))
    return getFilteredUsers(users)
}

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

const getUserById = async (id: string): Promise<DocumentData> => {
    const q = query(collection(db, 'users'), where('authID', '==', id))
    const users = await getDocs(q)
    let currentUser: any
    users.forEach((user) => {
        currentUser = { ...user.data(), docID: user.id }
    })
    return currentUser
}

export default {
    addUserToFirebaseDB,
    addUserToFirebaseDBLoggedInWithFacebook,
    getUserById,
    getAllUsers,
}
