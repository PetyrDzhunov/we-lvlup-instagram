import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'

function ProfilePageSkeleton(): JSX.Element {
    return (
        <Stack
            sx={{ marginLeft: '15px' }}
            spacing={2}
            direction="column"
            justifyContent="center"
        >
            <Stack direction="row" spacing={2}>
                <Skeleton variant="rectangular" width="40%" height={120} />
                <Skeleton variant="rectangular" width="40%" height={120} />
            </Stack>
            <Stack direction="row" spacing={2}>
                <Skeleton variant="rectangular" width="40%" height={120} />
                <Skeleton variant="rectangular" width="40%" height={120} />
            </Stack>
        </Stack>
    )
}

export default ProfilePageSkeleton
