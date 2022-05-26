import ListItem from '@mui/material/ListItem'
import { useEffect, useState } from 'react'
import { User } from '../../types'
import SingleUserImage from './SingleUserImage'
import SingleUserName from './SingleUserName'

import { auth } from '../../config/firebase'

interface SingleUserProps {
    user: User
}

function SingleUser({ user }: SingleUserProps): JSX.Element {
    const [status, setStatus] = useState<boolean>(false)

    useEffect(() => {
        auth.onAuthStateChanged((currUser) => {
            if (currUser) {
                if (currUser.uid === user.authID) {
                    setStatus(true)
                } else {
                    setStatus(false)
                }
            }
            if (!currUser) {
                setStatus(false)
            }
        })
    })

    return (
        <ListItem>
            <SingleUserImage image={user.profileImage} status={status} />
            <SingleUserName name={user.username || user.email} />
        </ListItem>
    )
}

export default SingleUser
