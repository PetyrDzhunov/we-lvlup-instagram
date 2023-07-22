import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles'

import { useMediaQuery } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, serverTimestamp, updateDoc, Timestamp } from 'firebase/firestore'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import NotFoundPage from '../not-found-page/NotFoundPage'
import FlexBoxCentered from '../../components/FlexBoxCentered'
import Error from '../../components/Error'
import { firebaseUsersService } from '../../services/firebase-service'
import { db, storage } from '../../config/firebase'
import StoryProgress from './StoryProgress'
import { addStory } from '../../store/users/usersSlice'

function LoggedInUserStory(): JSX.Element {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [open, setOpen] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [hasUploaded, setHasUploaded] = useState<boolean>(false)
    const [progress, setProgress] = useState<boolean>(false)

    const theme = useTheme()
    const isLaptop = useMediaQuery(theme.breakpoints.up('lg'))

    const loggedInUserID = useAppSelector(
        (state) => state.persistedReducer.auth.uid
    )
    const dispatch = useAppDispatch()
    const allUsers = useAppSelector((state) => state.users.allUsers)

    const loggedInUser = allUsers.find(
        (currUser) => currUser.authID === loggedInUserID
    )

    if (loggedInUser === undefined) {
        return <NotFoundPage />
    }

    const handleClickOpen = (): void => {
        setOpen(true)
    }

    const handleClose = (): void => {
        setOpen(false)
    }

    const viewStoryHandler = (): void => {
        handleClickOpen()
        setProgress(true)
        setTimeout(() => {
            handleClose()
        }, 3000)
    }
    const handleStoryChange = (e: Event): void => {
        const input = e.target as HTMLInputElement
        if (input.files && input.files.length > 0) {
            setSelectedFile(input.files[0])
            handleClickOpen()
            setHasUploaded((prev) => !prev)
        }
    }

    const addStoryHandler = async (): Promise<void> => {
        const storageRef = ref(storage, `stories/${selectedFile?.name}`)
        try {
            setIsLoading(true)
            handleClose()
            await uploadBytes(storageRef, selectedFile as Blob)
            const downloadUrl = await getDownloadURL(storageRef)
            const now = new Date()

            const story = {
                image: downloadUrl,
                createdAt: serverTimestamp() as Timestamp,
                expiresAt: new Date(
                    new Date(now).getTime() + 60 * 60 * 24 * 1000
                ),
            }

            const currentUser = await firebaseUsersService.getUserById(
                loggedInUserID
            )
            const currUserRef = doc(db, 'users', currentUser.docID)
            await updateDoc(currUserRef, {
                story,
            })
            dispatch(addStory({ userID: loggedInUserID, story }))
            setIsLoading(false)
            setHasUploaded(true)
        } catch (err) {
            setIsLoading(false)
            setError('Something went wrong.')
        }
    }

    return (
        <Box
            sx={{
                marginTop: isLaptop ? '0px' : '40px',
                marginLeft: '12px',
                display: 'flex',
                flexFlow: 'row nowrap',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <input
                name="file"
                type="file"
                id="userStory"
                className="file"
                accept="image/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleStoryChange(e as unknown as Event)
                }}
            />

            <label htmlFor="userStory" style={{ marginLeft: '0px' }}>
                {loggedInUser && !loggedInUser.story?.image && (
                    <Stack
                        direction="column"
                        sx={{
                            ml: '2',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Badge
                            overlap="circular"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            badgeContent={<AddCircleIcon color="primary" />}
                        >
                            <Avatar
                                onClick={() => handleClickOpen()}
                                alt="profile picture of the user"
                                src={loggedInUser.profileImage}
                                sx={{
                                    width: 56,
                                    height: 56,
                                    cursor: 'pointer',
                                }}
                            />
                        </Badge>
                        <Typography
                            sx={{
                                fontSize: '0.7rem',
                                marginTop: '8px',
                            }}
                        >
                            My
                        </Typography>
                    </Stack>
                )}
            </label>

            {loggedInUser && loggedInUser.story?.image && (
                <Stack
                    direction="column"
                    spacing={1}
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Stack
                        sx={{
                            borderRadius: '50%',
                            border: '2px solid red',
                        }}
                    >
                        <Avatar
                            onClick={viewStoryHandler}
                            alt="profile picture of the user"
                            src={loggedInUser.profileImage}
                            sx={{ width: 56, height: 56 }}
                        />
                    </Stack>
                    <Typography
                        sx={{
                            fontSize: '0.7rem',
                            marginTop: '8px',
                        }}
                    >
                        My
                    </Typography>
                </Stack>
            )}

            {error && <Error error={error} />}
            {isLoading && (
                <FlexBoxCentered flexDirection="row wrap">
                    <CircularProgress size="1.5em" />
                </FlexBoxCentered>
            )}
            <Dialog
                fullScreen
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0',
                }}
                open={open}
                onClose={handleClose}
            >
                <IconButton
                    aria-label="close"
                    onClick={() => {
                        setSelectedFile(null)
                        setHasUploaded((prev) => !prev)
                        handleClose()
                    }}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bgcolor: 'backgroud.paper',
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent
                    sx={{
                        padding: '0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {selectedFile && (
                        <img
                            className="story-preview"
                            src={URL.createObjectURL(selectedFile)}
                            alt="Preview of your choice"
                        />
                    )}
                </DialogContent>
                {hasUploaded && !loggedInUser.story?.image && (
                    <DialogActions sx={{ justifyContent: 'center' }}>
                        <Button
                            sx={{ alignText: 'center' }}
                            onClick={addStoryHandler}
                        >
                            Add story
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
            {loggedInUser.story?.image && (
                <Dialog
                    fullScreen
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '0',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    {progress && <StoryProgress />}

                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            color: 'primary.text',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent sx={{ display: 'flex', padding: '0' }}>
                        <img
                            className="story-preview"
                            src={loggedInUser.story.image}
                            alt="Preview of your choice"
                        />
                    </DialogContent>
                </Dialog>
            )}
        </Box>
    )
}

export default LoggedInUserStory
