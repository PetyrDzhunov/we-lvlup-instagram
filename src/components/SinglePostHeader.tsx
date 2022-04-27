import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Post } from '../types'
import { useAppSelector } from '../hooks/redux-hooks'
import { firebaseUsersService } from '../services/firebase-service'

interface SinglePostHeaderProps {
    profileImage: string
    post: Post
}

function SinglePostHeader({
    profileImage,
    post,
}: SinglePostHeaderProps): JSX.Element {
    const currentUser = useAppSelector((state) =>
        state.users.allUsers.find(
            (currUser) => currUser.authID === post.creator.uid
        )
    )

    // const dispatch = useAppDispatch()

    const { uid } = useAppSelector((state) => state.persistedReducer.auth)
    // filter only the posts that the loggedInUser followed to know on which one to display to follow him / unfollow him

    const handleFollowUser = async (): Promise<void> => {
        // get the ID of the currentUser browsing in the application (loggedInUser) === uid from persisted state in local storage
        // get the ID of the user that we clicked to follow (followedUser) === currentUser.authID
        // add his id to the FOLLOWERS array of the user that he presses to follow (send to the DB)
        if (currentUser === undefined) {
            return
        }
        try {
            await firebaseUsersService.addFollower(uid, currentUser.authID)
        } catch (err) {
            console.log(err)
        }
        // add the userID that he pressed to follow into his array of FOLLOWED users (send to DB)
        // dispatch(addFollower(uid, currentUser?.authID))
        // dispatch actions to redux store - one action that includes both the ID's as payload -
        // the loggedInUserID and followedUserID
    }

    return (
        <Stack
            justifyContent="space-between"
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{
                width: '100%',
                marginBottom: '8px',
                marginLeft: '4px',
                marginTop: '10px',
            }}
        >
            <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                    src={profileImage}
                    sx={{ width: '40px', height: '40px' }}
                />
                <Typography sx={{ fontWeight: 'bolder', marginBottom: '4px' }}>
                    {currentUser?.username ||
                        currentUser?.fullName ||
                        currentUser?.email.split('@')[0]}
                </Typography>
            </Stack>

            <Button
                variant="text"
                sx={{
                    fontSize: '0.85em',
                    fontWeight: 'bold',
                    justifySelf: 'flex-end',
                }}
                onClick={handleFollowUser}
            >
                Последване
            </Button>
        </Stack>
    )
}

export default SinglePostHeader
