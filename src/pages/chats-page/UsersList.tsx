import List from '@mui/material/List'
import { useAppSelector } from '../../hooks/redux-hooks'
import SingleUser from './SingleUser'

function UsersList(): JSX.Element {
    const allUsers = useAppSelector((state) => state.users.allUsers)

    return (
        <List sx={{ marginTop: '50px', paddingBottom: '50px' }}>
            {allUsers.map((user) => (
                <SingleUser key={user.authID} user={user} />
            ))}
        </List>
    )
}
export default UsersList
