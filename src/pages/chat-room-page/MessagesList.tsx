import List from '@mui/material/List'
import { useEffect, useRef } from 'react'
import { Message } from '../../types'
import SingleMessage from './SingleMessage'

interface MessagesListProps {
    messages: Message[]
}

function MessagesList({ messages }: MessagesListProps): JSX.Element {
    const bottomRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        bottomRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])
    return (
        <List
            sx={{
                display: 'flex',
                width: '100%',
                flexFlow: 'column',
                marginTop: '13%',
                maxHeight: '79%',
                overflow: 'scroll',
            }}
        >
            {messages.map((singleMessage, index) => (
                <SingleMessage
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    message={singleMessage}
                />
            ))}
            <div ref={bottomRef} />
        </List>
    )
}

export default MessagesList