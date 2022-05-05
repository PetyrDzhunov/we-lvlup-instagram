/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, DocumentData, updateDoc } from 'firebase/firestore/lite'

import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ButtonGroup from '@mui/material/ButtonGroup'
import CircularProgress from '@mui/material/CircularProgress'

import { Post } from '../../types'
import '../../styles/file-input.css'
import Error from '../../components/Error'
import { db, storage } from '../../config/firebase'
import { addFollower } from '../../store/users/usersSlice'
import { firebaseUsersService } from '../../services/firebase-service'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'

import ProfilePageModal from './ProfilePageModal'
import FlexBoxCentered from '../../components/FlexBoxCentered'

interface ProfilePageHeaderProps {
    myPosts: Post[]
    uid: string
}

function ProfilePageHeader({
    myPosts,
    uid,
}: ProfilePageHeaderProps): JSX.Element {
    const [selectedProfilePicture, setSelectedProfilePicture] =
        useState<File | null>(null)
    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [hasUploaded, setHasUploaded] = useState<boolean>(false)

    const currentUserVisited = useAppSelector((state) =>
        state.users.allUsers.find((currUser) => currUser.authID === uid)
    )

    const currentLoggedUser = useAppSelector((state) =>
        state.users.allUsers.find((currUser) => currUser.authID === uid)
    )

    const { uid: loggedInUserID } = useAppSelector(
        (state) => state.persistedReducer.auth
    )

    const hasFollowed = currentUserVisited?.followers.includes(loggedInUserID)
    const dispatch = useAppDispatch()
    const isInLoggedInProfilePage =
        loggedInUserID === currentUserVisited?.authID
    const handleFollowUser = async (): Promise<void> => {
        if (currentUserVisited === undefined) {
            return
        }

        dispatch(
            addFollower({
                loggedInUserId: loggedInUserID,
                currentUserId: currentUserVisited.authID,
            })
        )

        try {
            await firebaseUsersService.addFollower(
                loggedInUserID,
                currentUserVisited.authID
            )
        } catch (err) {
            setError('Unable to follow, try again later')
        }
    }

    // filter only those that have the loggedinUserId in their followed array
    const currentUserFollowers = useAppSelector((state) =>
        state.users.allUsers.filter((currUser) => {
            return currUser.followed.includes(uid)
        })
    )

    const currentUserFollowedByHim = useAppSelector((state) =>
        state.users.allUsers.filter((currUser) => {
            return currUser.followers.includes(uid)
        })
    )
    const [user, setUser] = useState<DocumentData>()

    useEffect(() => {
        const getUser = async (): Promise<void> => {
            const currentUser = await firebaseUsersService.getUserById(uid)
            setUser(currentUser)
        }
        getUser()
    }, [uid])

    let imageSrc
    if (selectedProfilePicture) {
        imageSrc = URL.createObjectURL(selectedProfilePicture)
    } else if (!selectedProfilePicture && !hasUploaded) {
        imageSrc = currentLoggedUser?.profileImage || user?.profileImage
    } else {
        imageSrc = ''
    }

    const handleFileChange = (e: Event): void => {
        if (loggedInUserID !== currentUserVisited?.authID) {
            return setError('This is not your profile!')
        }
        const input = e.target as HTMLInputElement
        if (input.files && input.files.length > 0) {
            setSelectedProfilePicture(input.files[0])
        }
    }

    const removeImageHandler = (): void => {
        setSelectedProfilePicture(null)
    }

    const handleCreateProfilePicture = async (): Promise<void> => {
        const storageRef = ref(
            storage,
            `images/${selectedProfilePicture?.name}`
        )

        try {
            setIsLoading(true)
            await uploadBytes(storageRef, selectedProfilePicture as Blob)
            const downloadUrl = await getDownloadURL(storageRef)
            const currentUser = await firebaseUsersService.getUserById(uid)
            const currUserRef = doc(db, 'users', currentUser.docID)
            await updateDoc(currUserRef, {
                profileImage: downloadUrl,
            })
            setHasUploaded(true)
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            setError('Something went wrong.')
        }
    }

    return (
        <FlexBoxCentered flexDirection="column wrap">
            {!isInLoggedInProfilePage && (
                <Button
                    variant="text"
                    sx={{
                        position: 'absolute',
                        fontSize: '0.90em',
                        fontWeight: 'bold',
                        right: '0',
                        top: '60px',
                    }}
                    onClick={handleFollowUser}
                >
                    {hasFollowed ? 'Unfollow' : 'Follow'}
                </Button>
            )}
            <Stack marginLeft={0.7} spacing={2} marginTop={1.5}>
                <input
                    name="file"
                    type="file"
                    id="userImage"
                    className="file"
                    accept="image/*"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleFileChange(e as unknown as Event)
                    }}
                />
                <label htmlFor="userImage">
                    <IconButton component="span" aria-label="upload picture">
                        <Avatar
                            src={imageSrc}
                            sx={{ width: '100px', height: '100px' }}
                        />
                    </IconButton>
                </label>
                {error && <Error error={error} />}

                {isLoading && (
                    <FlexBoxCentered flexDirection="row wrap">
                        <CircularProgress size="1.5em" />
                    </FlexBoxCentered>
                )}
                <Typography sx={{ textAlign: 'center' }}>
                    {currentUserVisited?.fullName ||
                        currentUserVisited?.username ||
                        currentUserVisited?.email}
                </Typography>
            </Stack>
            {selectedProfilePicture && !hasUploaded && (
                <ButtonGroup sx={{ marginTop: '16px' }}>
                    <Button onClick={handleCreateProfilePicture}>Запази</Button>
                    <Button onClick={removeImageHandler}>Премахни</Button>
                </ButtonGroup>
            )}
            <Stack
                direction="row"
                marginTop={3}
                divider={<Divider orientation="vertical" flexItem />}
                spacing={3}
            >
                <Stack spacing={1}>
                    <Typography align="center" sx={{ fontSize: '1em' }}>
                        {myPosts.length}
                    </Typography>
                    <Typography sx={{ fontSize: '1em' }}>Posts</Typography>
                </Stack>
                <Stack spacing={1}>
                    <Typography align="center" sx={{ fontSize: '1' }}>
                        {currentLoggedUser?.followers.length ||
                            user?.followers.length}
                    </Typography>
                    <Typography sx={{ fontSize: '1em' }}>Followers</Typography>
                </Stack>
                <Stack spacing={1}>
                    <Typography align="center" sx={{ fontSize: '1' }}>
                        {currentLoggedUser?.followed.length ||
                            user?.followed.length}
                    </Typography>
                    <Typography sx={{ fontSize: '1' }}>Followed</Typography>
                </Stack>
            </Stack>
            <Stack
                direction="row"
                spacing={3}
                justifyContent="space-between"
                sx={{
                    marginTop: '15px',
                }}
            >
                <ProfilePageModal
                    users={currentUserFollowers}
                    text="followers"
                />
                <ProfilePageModal
                    users={currentUserFollowedByHim}
                    text="followed"
                />
            </Stack>
        </FlexBoxCentered>
    )
}
export default ProfilePageHeader
