import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { useAppSelector } from '../../hooks/redux-hooks'
import { Message } from '../../types'

interface SingleMessageProps {
    message: Message
}

function SingleMessage({ message }: SingleMessageProps): JSX.Element {
    const creator = useAppSelector((state) =>
        state.users.allUsers.find(
            (currUser) => currUser.authID === message.creatorID
        )
    )

    const loggedInUserID = useAppSelector(
        (state) => state.persistedReducer.auth.uid
    )

    const isCreator = loggedInUserID === message.creatorID

    const loggedInUserMessage = (
        <ListItem
            sx={{
                flexFlow: 'row-reverse',
            }}
        >
            <Avatar
                src={creator?.profileImage}
                sx={{ width: '40px', height: '40px', marginLeft: '12px' }}
            />
            <Typography
                sx={{
                    backgroundColor: 'rgb(0, 132, 255)',
                    color: '#fff',
                    padding: '8px',
                    borderRadius: '16px',
                    wordWrap: 'break-word',
                    maxWidth: '80%',
                }}
            >
                {message.message}
            </Typography>
        </ListItem>
    )

    const secondUserMessage = (
        <ListItem
            sx={{
                flexFlow: 'row',
            }}
        >
            <Avatar
                src={creator?.profileImage}
                sx={{ width: '40px', height: '40px', marginRight: '12px' }}
            />
            <Typography
                sx={{
                    backgroundColor: '#E4E6EB',
                    color: 'black',
                    padding: '8px',
                    borderRadius: '16px',
                }}
            >
                {message.message}
            </Typography>
        </ListItem>
    )

    return (
        <>
            {isCreator && loggedInUserMessage}
            {!isCreator && secondUserMessage}
        </>
    )
}

export default SingleMessage
