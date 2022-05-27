import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    where,
    getDocs,
    updateDoc,
    doc,
    arrayUnion,
    getDoc,
} from 'firebase/firestore'
import { firebaseUsersService } from '..'

import { db } from '../../../config/firebase'
import { ChatRoom, Message, User } from '../../../types'
import { getFilteredChatRooms } from './utils'

const createNewChatRoom = async (user1: User, user2: User): Promise<string> => {
    const firstUser = await firebaseUsersService.getUserById(user1.authID)
    const firstUserRef = doc(db, 'users', firstUser.docID)

    const secondUser = await firebaseUsersService.getUserById(user2.authID)
    const secondUserRef = doc(db, 'users', secondUser.docID)

    if (firstUser.chatRooms !== undefined) {
        console.log(firstUser.chatRoom)
        console.log(secondUser.authID)
        if (firstUser.chatRooms[secondUser.authID]) {
            return firstUser.chatRooms[secondUser.authID]
        }
    }

    const currentDoc = await addDoc(collection(db, 'chatRooms'), {
        participant1: user1,
        participant2: user2,
        messages: [],
        created: serverTimestamp(),
    })

    const { id } = currentDoc

    await updateDoc(firstUserRef, {
        chatRooms: {
            [user2.authID]: id,
        },
    })

    await updateDoc(secondUserRef, {
        chatRooms: {
            [user1.authID]: id,
        },
    })

    return currentDoc.id
}

const getChatRoomByID = async (chatRoomID: string): Promise<ChatRoom[]> => {
    const q = query(collection(db, 'chatRooms'), where('id', '==', chatRoomID))
    const chatRooms = await getDocs(q)
    return getFilteredChatRooms(chatRooms)
}

const sendMessageToChatRoom = async (
    chatRoomID: string,
    message: Message
): Promise<void> => {
    const chatRoomRef = doc(db, 'chatRooms', chatRoomID)
    const chatRoom = await getDoc(chatRoomRef)
    console.log(chatRoom)
    await updateDoc(chatRoomRef, {
        messages: arrayUnion(message),
    })
}

export default {
    createNewChatRoom,
    getChatRoomByID,
    sendMessageToChatRoom,
}
