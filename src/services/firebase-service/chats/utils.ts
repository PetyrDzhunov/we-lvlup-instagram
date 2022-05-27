import { DocumentData, QuerySnapshot } from 'firebase/firestore/lite'

import { ChatRoom } from '../../../types'

export const getFilteredChatRooms = (
    chatRooms: QuerySnapshot<DocumentData>
): ChatRoom[] => {
    const allChatRooms: ChatRoom[] = []
    chatRooms.forEach((chatRoom) => {
        if (chatRoom.exists()) {
            allChatRooms.push({
                ...chatRoom.data(),
                docID: chatRoom.id,
            } as ChatRoom)
        }
    })
    return allChatRooms
}
