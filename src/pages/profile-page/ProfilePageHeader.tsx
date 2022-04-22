/* eslint-disable jsx-a11y/label-has-associated-control */
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import {
    Button,
    ButtonGroup,
    CircularProgress,
    Divider,
    IconButton,
    Typography,
} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { useEffect, useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, DocumentData, updateDoc } from 'firebase/firestore/lite'
import { Post } from '../../types'
import '../../styles/file-input.css'
import { db, storage } from '../../config/firebase'
import { firebaseService } from '../../services/firebase-service'
import { useAppSelector } from '../../hooks/redux-hooks'

interface ProfilePageHeaderProps {
    email: string
    fullName: string | null
    myPosts: Post[]
    uid: string
}

function ProfilePageHeader({
    email,
    fullName,
    myPosts,
    uid,
}: ProfilePageHeaderProps): JSX.Element {
    const [selectedProfilePicture, setSelectedProfilePicture] =
        useState<File | null>(null)

    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [hasUploaded, setHasUploaded] = useState<boolean>(false)

    const userID = useAppSelector((state) => state.persistedReducer.auth.uid)

    const [user, setUser] = useState<DocumentData>()

    useEffect(() => {
        const getUser = async (): Promise<void> => {
            const currentUser = await firebaseService.getUserById(userID)
            setUser(currentUser)
        }
        getUser()
    }, [userID])

    let imageSrc
    if (selectedProfilePicture) {
        imageSrc = URL.createObjectURL(selectedProfilePicture)
    } else if (!selectedProfilePicture && !hasUploaded) {
        imageSrc = user?.profileImage
    } else {
        imageSrc = ''
    }

    const handleFileChange = (e: Event): void => {
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
            const currentUser = await firebaseService.getUserById(uid)
            const currUserRef = doc(db, 'users', currentUser.docID)
            await updateDoc(currUserRef, {
                profileImage: downloadUrl,
            })
            setHasUploaded(true)
            setIsLoading(false)
        } catch (err) {
            console.log(err)
            setIsLoading(false)
            setError('Something went wrong.')
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexFlow: 'column wrap',
                alignItems: 'center',
            }}
        >
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

                {error && (
                    <Typography
                        align="center"
                        color="error"
                        variant="body2"
                        sx={{
                            fontWeight: 'bolder',
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                        paragraph
                    >
                        {error}
                    </Typography>
                )}

                {isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress size="1.5em" />
                    </Box>
                )}
                <Typography>{fullName || email}</Typography>
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
                        0
                    </Typography>
                    <Typography sx={{ fontSize: '1em' }}>Followers</Typography>
                </Stack>
                <Stack spacing={1}>
                    <Typography align="center" sx={{ fontSize: '1' }}>
                        0
                    </Typography>
                    <Typography sx={{ fontSize: '1' }}>Followed</Typography>
                </Stack>
            </Stack>
        </Box>
    )
}
export default ProfilePageHeader
