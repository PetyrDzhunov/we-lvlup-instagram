import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { Divider, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { Post } from '../../types'

interface ProfilePageHeaderProps {
    email: string
    fullName: string | null
    myPosts: Post[]
}

function ProfilePageHeader({
    email,
    fullName,
    myPosts,
}: ProfilePageHeaderProps): JSX.Element {
    return (
        <Box
            sx={{
                display: 'flex',
                flexFlow: 'column wrap',
                alignItems: 'center',
            }}
        >
            <Stack marginLeft={0.7} spacing={2} marginTop={1.5}>
                <Avatar
                    src="/broken-image.jpg"
                    sx={{ width: '100px', height: '100px' }}
                />
                <Typography>{fullName || email}</Typography>
            </Stack>
            <Stack
                direction="row"
                marginTop={3}
                divider={<Divider orientation="vertical" flexItem />}
                spacing={3}
            >
                <Stack spacing={1}>
                    <Typography align="center" sx={{ fontSize: '1em' }}>
                        {myPosts.length}
                    </Typography>
                    <Typography sx={{ fontSize: '1em' }}>Posts</Typography>
                </Stack>
                <Stack spacing={1}>
                    <Typography align="center" sx={{ fontSize: '1' }}>
                        0
                    </Typography>
                    <Typography sx={{ fontSize: '1em' }}>Followers</Typography>
                </Stack>
                <Stack spacing={1}>
                    <Typography align="center" sx={{ fontSize: '1' }}>
                        0
                    </Typography>
                    <Typography sx={{ fontSize: '1' }}>Followed</Typography>
                </Stack>
            </Stack>
        </Box>
    )
}
export default ProfilePageHeader
