import ListItem from '@mui/material/List'
import { Message } from '../../types'

interface SingleMessageProps {
    message: Message
}

function SingleMessage({ message }: SingleMessageProps): JSX.Element {
    return <ListItem>{message.message}</ListItem>
}

export default SingleMessage
