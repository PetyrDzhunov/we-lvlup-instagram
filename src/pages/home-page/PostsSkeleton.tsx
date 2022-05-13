import Stack from '@mui/material/Stack'

import BasicPostSkeleton from './BasicPostSkeleton'
import StorySkeleton from './StorySkeleton'

function PostsSkeleton(): JSX.Element {
    return (
        <Stack spacing={1}>
            <Stack spacing={1} direction="row" sx={{ paddingTop: '50px' }}>
                <StorySkeleton />
                <StorySkeleton />
                <StorySkeleton />
                <StorySkeleton />
                <StorySkeleton />
                <StorySkeleton />
            </Stack>
            <BasicPostSkeleton />
            <BasicPostSkeleton />
            <BasicPostSkeleton />
        </Stack>
    )
}
export default PostsSkeleton
