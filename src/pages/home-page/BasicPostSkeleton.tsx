import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'

function BasicPostSkeleton(): JSX.Element {
    return (
        <>
            <Stack sx={{ marginTop: '75px' }} direction="row" spacing={1}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="text" width={100} />
            </Stack>
            <Skeleton variant="rectangular" width="100%" height={250} />
        </>
    )
}

export default BasicPostSkeleton
