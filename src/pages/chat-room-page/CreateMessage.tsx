import TextField from '@mui/material/TextField'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { firebaseChatsService } from '../../services/firebase-service'

interface CreateMessageProps {
    chatRoomID: string
    loggedInUserID: string
}

function CreateMessage({
    chatRoomID,
    loggedInUserID,
}: CreateMessageProps): JSX.Element {
    const messageInputRef = useRef<HTMLInputElement | undefined>()
    const navigate = useNavigate()

    const sendMessage = async (event: React.KeyboardEvent): Promise<void> => {
        const message = messageInputRef?.current?.value
        if (message === undefined) {
            return
        }

        const newMessage = {
            message,
            creatorID: loggedInUserID,
            createdAt: new Date(),
        }
        if (event.key === 'Enter') {
            try {
                await firebaseChatsService.sendMessageToChatRoom(
                    chatRoomID,
                    newMessage
                )
            } catch (err) {
                console.log(err)
            }

            messageInputRef!.current!.value! = ''
            navigate(`/chats/${chatRoomID}`)
        }
    }

    return (
        <TextField
            onKeyDown={sendMessage}
            sx={{
                position: 'sticky',
                bottom: '60px',
                width: '100%',
                borderRadius: '40px',
            }}
            inputRef={messageInputRef}
            placeholder="Съобщение..."
        />
    )
}

export default CreateMessage
