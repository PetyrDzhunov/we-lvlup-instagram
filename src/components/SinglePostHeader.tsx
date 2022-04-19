import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import stringAvatar from '../utils/stringToColor'

interface SinglePostHeaderProps {
    creator: string
}

function SinglePostHeader({ creator }: SinglePostHeaderProps): JSX.Element {
    return (
        <Stack
            justifyContent="flex-start"
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ width: '100%', marginBottom: '8px', marginLeft: '4px' }}
        >
            <Avatar {...stringAvatar(creator)} />
            <Typography sx={{ fontWeight: 'bolder', marginBottom: '4px' }}>
                {creator.split('@')[0]}
            </Typography>
        </Stack>
    )
}

export default SinglePostHeader
