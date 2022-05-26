import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
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

    console.log(chatRoom)
    const isTheLoggedUser = loggedInUserID === chatRoom?.participant1.authID
    return (
        <PageLayout>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {!isInitial && chatRoom && (
                <MessagesList messages={chatRoom.messages} />
            )}

            <CreateMessage
                chatRoomID={chatRoomID!}
                loggedInUserID={loggedInUserID}
            />
        </PageLayout>
    )
}

export default ChatRoomPage
