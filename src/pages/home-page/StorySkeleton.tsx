import Skeleton from '@mui/material/Skeleton'

function StorySkeleton(): JSX.Element {
    return (
        <Skeleton
            variant="circular"
            width={56}
            height={56}
            sx={{
                marginBottom: '10px',
                marginLeft: '10px',
            }}
        />
    )
}

export default StorySkeleton
