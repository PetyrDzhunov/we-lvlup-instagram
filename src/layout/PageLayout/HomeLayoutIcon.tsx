import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home'
import { useNavigate } from 'react-router-dom'

function HomeLayoutIcon(): JSX.Element {
    const navigate = useNavigate()
    const homeHandler = (): void => {
        navigate('/')
    }

    return (
        <IconButton onClick={homeHandler}>
            <HomeIcon fontSize="medium" sx={{ color: 'text.primary' }} />
        </IconButton>
    )
}

export default HomeLayoutIcon
