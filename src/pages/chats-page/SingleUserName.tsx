import Typography from '@mui/material/Typography'

interface SingleUserNameProps {
    name: string
}

function SingleUserName({ name }: SingleUserNameProps): JSX.Element {
    return (
        <Typography sx={{ marginBottom: '0px', marginLeft: '12px' }} paragraph>
            {name}
        </Typography>
    )
}

export default SingleUserName
