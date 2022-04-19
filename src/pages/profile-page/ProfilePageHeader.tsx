import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import { Post } from '../../types'

interface ProfilePageHeaderProps {
    email: string
    fullName: string | null
    myPosts: Post[] | Post
}

function ProfilePageHeader({
    email,
    fullName,
    myPosts,
}: ProfilePageHeaderProps): JSX.Element {
    console.log(myPosts)
    return (
        <Box>
            <Stack>
                <img alt="" />
                <Typography>{fullName || email}</Typography>
            </Stack>
            <Stack>
                <Stack>
                    <Typography />
                    <Typography />
                </Stack>
                <Stack>
                    <Typography />
                    <Typography />
                </Stack>
                <Stack>
                    <Typography />
                    <Typography />
                </Stack>
            </Stack>
        </Box>
    )
}
export default ProfilePageHeader
