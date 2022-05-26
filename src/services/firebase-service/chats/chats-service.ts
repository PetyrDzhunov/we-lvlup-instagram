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
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

import { db } from '../../../config/firebase'
import { ChatRoom, Message, User } from '../../../types'
import { getFilteredChatRooms } from './utils'

const createNewChatRoom = async (user1: User, user2: User): Promise<string> => {
    const id = uuidv4()
    await addDoc(collection(db, 'chatRooms'), {
        participant1: user1,
        participant2: user2,
        messages: [],
        id,
        created: serverTimestamp(),
    })
    return id
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
    const chatRoom = await getChatRoomByID(chatRoomID)
    const currentChatRoomDocID = chatRoom[0].docID!
    const currentChatRoomRef = doc(db, 'chatRooms', currentChatRoomDocID)
    await updateDoc(currentChatRoomRef, {
        messages: arrayUnion(message),
    })
}

export default {
    createNewChatRoom,
    getChatRoomByID,
    sendMessageToChatRoom,
}
