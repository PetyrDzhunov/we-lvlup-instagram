import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CommentIcon from '@mui/icons-material/Comment'
import ShareIcon from '@mui/icons-material/Share'
import { Typography } from '@mui/material'

interface SinglePostFooterProps {
    likes: number
}

function SinglePostFooter({ likes }: SinglePostFooterProps): JSX.Element {
    return (
        <AppBar
            elevation={0}
            position="static"
            color="primary"
            sx={{
                top: 'auto',
                bottom: 0,
                backgroundColor: '#ffffff',
                paddingLeft: '0px',
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <IconButton>
                    <FavoriteBorderIcon
                        fontSize="medium"
                        sx={{ color: '#000000' }}
                    />
                </IconButton>
                <IconButton>
                    <CommentIcon fontSize="medium" sx={{ color: '#000000' }} />
                </IconButton>
                <IconButton>
                    <ShareIcon fontSize="medium" sx={{ color: '#000000' }} />
                </IconButton>
            </Toolbar>
            <Typography
                sx={{
                    color: '#000000',
                    marginLeft: '10px',
                    fontSize: '0.9em',
                    fontWeight: '600',
                }}
            >
                {likes} харесвания
            </Typography>
        </AppBar>
    )
}
export default SinglePostFooter
