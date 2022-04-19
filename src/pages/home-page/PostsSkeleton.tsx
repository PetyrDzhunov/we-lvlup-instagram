import Stack from '@mui/material/Stack'
import BasicPostSkeleton from './BasicPostSkeleton'

function PostsSkeleton(): JSX.Element {
    return (
        <Stack spacing={1}>
            <BasicPostSkeleton />
            <BasicPostSkeleton />
            <BasicPostSkeleton />
        </Stack>
    )
}
export default PostsSkeleton
