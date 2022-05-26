import List from '@mui/material/List'
import { useEffect } from 'react'
import { Message } from '../../types'
import SingleMessage from './SingleMessage'

interface MessagesListProps {
    messages: Message[]
}

function MessagesList({ messages }: MessagesListProps): JSX.Element {
    console.log(messages)
    return (
        <List>
            {/* {messages.map((singleMessage, index) => (
                // eslint-disable-next-line react/no-array-index-key
                // <SingleMessage key={index} message={singleMessage} />
            ))} */}
        </List>
    )
}

export default MessagesList
