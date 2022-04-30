import Typography from '@mui/material/Typography'

interface ErrorProps {
    error: string
}

function Error({ error }: ErrorProps): JSX.Element {
    return (
        <Typography
            align="center"
            color="error"
            variant="body2"
            sx={{ fontWeight: 'bolder', marginTop: '10px' }}
            paragraph
        >
            {error}
        </Typography>
    )
}

export default Error
