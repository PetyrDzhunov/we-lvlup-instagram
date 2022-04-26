import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Post } from '../types'
import { useAppSelector } from '../hooks/redux-hooks'

interface SinglePostHeaderProps {
    profileImage: string
    post: Post
}

function SinglePostHeader({
    profileImage,
    post,
}: SinglePostHeaderProps): JSX.Element {
    const currentUser = useAppSelector((state) =>
        state.users.allUsers.find(
            (currUser) => currUser.authID === post.creator.uid
        )
    )

    return (
        <Stack
            justifyContent="flex-start"
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{
                width: '100%',
                marginBottom: '8px',
                marginLeft: '4px',
                marginTop: '10px',
            }}
        >
            <Avatar src={profileImage} sx={{ width: '40px', height: '40px' }} />
            <Typography sx={{ fontWeight: 'bolder', marginBottom: '4px' }}>
                {currentUser?.username ||
                    currentUser?.fullName ||
                    currentUser?.email.split('@')[0]}
            </Typography>
        </Stack>
    )
}

export default SinglePostHeader
