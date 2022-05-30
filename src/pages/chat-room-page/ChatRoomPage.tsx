import { doc, DocumentData, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { db } from '../../config/firebase'
import { useAppSelector } from '../../hooks/redux-hooks'
import PageLayout from '../../layout/PageLayout/PageLayout'
import { firebaseChatsService } from '../../services/firebase-service'
import { ChatRoom, PageProps } from '../../types'
import CreateMessage from './CreateMessage'
import MessagesList from './MessagesList'

let isInitial = true

function ChatRoomPage({ title }: PageProps): JSX.Element {
    const { chatRoomID } = useParams()
    const [chatRoom, setChatRoom] = useState<ChatRoom>()
    const loggedInUserID = useAppSelector(
        (state) => state.persistedReducer.auth.uid
    )

    useEffect(() => {
        const getChatRoomParticipants = async (): Promise<void> => {
            try {
                const room = await firebaseChatsService.getChatRoomByID(
                    chatRoomID!
                )
                setChatRoom(room[0])
                isInitial = false
            } catch (err) {
                console.log(err)
            }
        }
        getChatRoomParticipants()
    }, [chatRoomID])

    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(db, 'chatRooms', chatRoomID!),
            (currDoc: DocumentData) => {
                const currChatRoom: ChatRoom = currDoc.data()

                setChatRoom(currChatRoom)
            }
        )
        return () => {
            unsubscribe()
        }
    }, [chatRoomID])

    return (
        <PageLayout hidden flex="column">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {!isInitial && chatRoom && (
                <MessagesList messages={chatRoom.messages} />
            )}

            {chatRoom && (
                <CreateMessage
                    chatRoomID={chatRoomID!}
                    loggedInUserID={loggedInUserID}
                />
            )}
        </PageLayout>
    )
}

export default ChatRoomPage
