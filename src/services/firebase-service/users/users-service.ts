import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    DocumentData,
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove,
} from 'firebase/firestore'

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
        followed: [],
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
            followed: [],
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

const addFollower = async (
    loggedInUserID: string,
    followedUserID: string
): Promise<void> => {
    const followedUser = await getUserById(followedUserID)
    const loggedInUser = await getUserById(loggedInUserID)
    const followedUserRef = doc(db, 'users', followedUser.docID)
    const loggedInUserRef = doc(db, 'users', loggedInUser.docID)

    // to the user that we press to follow add in his followers array the user that wants to follow him - array with users that follow him
    if (!followedUser.followers.includes(loggedInUserID)) {
        await updateDoc(followedUserRef, {
            followers: arrayUnion(loggedInUserID),
        })
    } else {
        await updateDoc(followedUserRef, {
            followers: arrayRemove(loggedInUserID),
        })
    }

    // add to the current logged in user the user that he wants to follow into his followed array - array with users he follows
    if (!loggedInUser.followed.includes(followedUserID)) {
        await updateDoc(loggedInUserRef, {
            followed: arrayUnion(followedUserID),
        })
    } else {
        await updateDoc(loggedInUserRef, {
            followed: arrayRemove(followedUserID),
        })
    }
}

export default {
    addUserToFirebaseDB,
    addUserToFirebaseDBLoggedInWithFacebook,
    getUserById,
    getAllUsers,
    addFollower,
}
