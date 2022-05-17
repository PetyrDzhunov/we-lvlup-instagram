import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
// import Autocomplete from '@mui/material/Autocomplete'
import { ChangeEvent, useState } from 'react'
import { useAppSelector } from '../hooks/redux-hooks'
import { User } from '../types'
import ProfilePageModal from '../pages/profile-page/ProfilePageModal'
// import { User } from '../types'

function SearchInput(): JSX.Element {
    const [searchText, setSearchText] = useState<string>('')
    const [usersSearched, setUsersSearched] = useState<User[]>([])
    const allUsers = useAppSelector((state) => state.users.allUsers)
    const usersWithUsernames = allUsers.filter((currUser) => currUser.username)
    const handleTextChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        setSearchText(event.target.value)
        setUsersSearched(
            usersWithUsernames.filter((user: User) => {
                const lowerCaseUser = user.username?.toLowerCase()
                if (lowerCaseUser === undefined) {
                    return
                }
                return lowerCaseUser.includes(event.target.value.toLowerCase())
            })
        )
    }
    return (
        <Stack
            spacing={2}
            sx={{ width: '60%', margin: '0 auto', paddingTop: '10px' }}
        >
            {searchText && (
                <Stack>
                    <ProfilePageModal
                        users={usersSearched}
                        text="Users"
                        count={usersSearched.length}
                    />
                </Stack>
            )}
            <TextField
                sx={{ paddingBottom: '6px' }}
                size="small"
                onChange={handleTextChange}
                value={searchText}
                placeholder="Search user..."
            />
        </Stack>
    )
}

export default SearchInput
