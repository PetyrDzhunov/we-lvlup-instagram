import { useNavigate } from 'react-router-dom'
import SendIcon from '@mui/icons-material/Send'
import IconButton from '@mui/material/IconButton'

interface ChatLayoutIconProps {
    desktop?: boolean
}

function ChatLayoutIcon({ desktop }: ChatLayoutIconProps): JSX.Element {
    const navigate = useNavigate()
    const homeHandler = (): void => {
        navigate('/chats')
    }

    return (
        <IconButton onClick={homeHandler}>
            <SendIcon
                fontSize="medium"
                sx={{
                    color: 'text.primary',
                    fontSize: desktop ? '2.2rem' : '1.5rem',
                    margin: desktop ? '6px' : '0px',
                }}
            />
        </IconButton>
    )
}

export default ChatLayoutIcon
