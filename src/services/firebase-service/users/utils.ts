import {
    collection,
    query,
    where,
    getDocs,
    DocumentData,
    QuerySnapshot,
} from 'firebase/firestore/lite'

import { db } from '../../../config/firebase'
import { User } from '../../../types'

export const getFilteredUsers = (
    users: QuerySnapshot<DocumentData>
): User[] => {
    const allUsers: User[] = []
    users.forEach((user) => {
        if (user.exists()) {
            allUsers.push(user.data() as User)
        }
    })
    return allUsers
}

export const checkIfUserExistsInDb = async (id: string): Promise<boolean> => {
    const q = query(collection(db, 'users'), where('authID', '==', id))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
        return true
    }
    return false
}
