import ListItem from '@mui/material/ListItem'
import { useEffect } from 'react'
import {
    collection,
    DocumentData,
    onSnapshot,
    query,
    QuerySnapshot,
} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { User } from '../../types'
import SingleUserImage from './SingleUserImage'
import SingleUserName from './SingleUserName'

import { db } from '../../config/firebase'
import { loadAllUsers } from '../../store/users/usersSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { firebaseChatsService } from '../../services/firebase-service'

interface SingleUserProps {
    user: User
}

function SingleUser({ user }: SingleUserProps): JSX.Element {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const loggedInUserId = useAppSelector(
        (state) => state.persistedReducer.auth.uid
    )
    const loggedInUser = useAppSelector((state) =>
        state.users.allUsers.find(
            (currUser) => currUser.authID === loggedInUserId
        )
    )
    const secondUser = useAppSelector((state) =>
        state.users.allUsers.find((currUser) => currUser.authID === user.authID)
    )

    const startChatHandler = async (): Promise<void> => {
        try {
            const chatRoomID = await firebaseChatsService.createNewChatRoom(
                loggedInUser as User,
                secondUser as User
            )
            navigate(`/chats/${chatRoomID}`)
        } catch (err) {
            console.log(err)
        }
    }

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
        <ListItem onClick={startChatHandler}>
            <SingleUserImage image={user.profileImage} status={user.status!} />
            <SingleUserName name={user.username || user.email} />
        </ListItem>
    )
}

export default SingleUser
