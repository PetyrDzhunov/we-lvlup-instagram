import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home'
import { useNavigate } from 'react-router-dom'

interface HomeLayoutIconProps {
    desktop?: boolean
}

function HomeLayoutIcon({ desktop }: HomeLayoutIconProps): JSX.Element {
    const navigate = useNavigate()
    const homeHandler = (): void => {
        navigate('/')
    }

    return (
        <IconButton onClick={homeHandler}>
            <HomeIcon
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

export default HomeLayoutIcon
