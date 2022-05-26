import ListItem from '@mui/material/ListItem'
import { useEffect } from 'react'
import {
    collection,
    DocumentData,
    onSnapshot,
    query,
    QuerySnapshot,
} from 'firebase/firestore'
import { User } from '../../types'
import SingleUserImage from './SingleUserImage'
import SingleUserName from './SingleUserName'

import { db } from '../../config/firebase'
import { loadAllUsers } from '../../store/users/usersSlice'
import { useAppDispatch } from '../../hooks/redux-hooks'

interface SingleUserProps {
    user: User
}

function SingleUser({ user }: SingleUserProps): JSX.Element {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const q = query(collection(db, 'users'))
        const unsubscribe = onSnapshot(
            q,
            (querySnapshot: QuerySnapshot<DocumentData>) => {
                const allUsers: User[] = []
                querySnapshot.forEach((doc) => {
                    allUsers.push(doc.data() as User)
                })
                dispatch(loadAllUsers(allUsers))
            }
        )
        return () => {
            unsubscribe()
        }
    }, [dispatch])

    return (
        <ListItem>
            <SingleUserImage image={user.profileImage} status={user.status!} />
            <SingleUserName name={user.username || user.email} />
        </ListItem>
    )
}

export default SingleUser
