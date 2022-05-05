import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
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
import { doc, updateDoc } from 'firebase/firestore/lite'
import { useAppSelector } from '../../hooks/redux-hooks'
import NotFoundPage from '../not-found-page/NotFoundPage'
import FlexBoxCentered from '../../components/FlexBoxCentered'
import Error from '../../components/Error'
import { firebaseUsersService } from '../../services/firebase-service'
import { db, storage } from '../../config/firebase'

function LoggedInUserStory(): JSX.Element {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [open, setOpen] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [hasUploaded, setHasUploaded] = useState<boolean>(false)

    const loggedInUserID = useAppSelector(
        (state) => state.persistedReducer.auth.uid
    )
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
    }
    const handleStoryChange = (e: Event): void => {
        const input = e.target as HTMLInputElement
        if (input.files && input.files.length > 0) {
            setSelectedFile(input.files[0])
            handleClickOpen()
        }
    }

    const addStoryHandler = async (): Promise<void> => {
        const storageRef = ref(storage, `stories/${selectedFile?.name}`)

        try {
            setIsLoading(true)
            handleClose()
            await uploadBytes(storageRef, selectedFile as Blob)
            const downloadUrl = await getDownloadURL(storageRef)
            const currentUser = await firebaseUsersService.getUserById(
                loggedInUserID
            )
            const currUserRef = doc(db, 'users', currentUser.docID)
            await updateDoc(currUserRef, {
                story: downloadUrl,
            })
            setIsLoading(false)
            setHasUploaded((prev) => !prev)
        } catch (err) {
            setIsLoading(false)
            setError('Something went wrong.')
        }
    }

    return (
        <Box
            sx={{
                marginTop: '40px',
                marginLeft: '12px',
                display: 'flex',
                flexFlow: 'row nowrap',
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
                {loggedInUser && !loggedInUser.story && (
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
                                onClick={viewStoryHandler}
                                alt="profile picture of the user"
                                src={
                                    hasUploaded
                                        ? loggedInUser.story
                                        : loggedInUser.profileImage
                                }
                                sx={{ width: 56, height: 56 }}
                            />
                        </Badge>
                        <Typography
                            sx={{
                                fontSize: '0.7rem',

                                marginTop: '8px',
                            }}
                        >
                            Моя история
                        </Typography>
                    </Stack>
                )}

                {loggedInUser && loggedInUser.story && (
                    <Stack direction="column" spacing={1}>
                        <Avatar
                            onClick={viewStoryHandler}
                            alt="profile picture of the user"
                            src={loggedInUser.story}
                            sx={{ width: 56, height: 56 }}
                        />
                        <Typography
                            sx={{
                                fontSize: '0.7rem',
                                marginTop: '8px',
                            }}
                        >
                            Моя история
                        </Typography>
                    </Stack>
                )}
            </label>
            {error && <Error error={error} />}
            {isLoading && (
                <FlexBoxCentered flexDirection="row wrap">
                    <CircularProgress size="1.5em" />
                </FlexBoxCentered>
            )}
            <Dialog
                sx={{
                    minWidth: '60%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0',
                }}
                open={open}
                onClose={handleClose}
            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        color: '#ffffff',
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={{ padding: '0' }}>
                    {selectedFile && (
                        <img
                            className="story-preview"
                            src={URL.createObjectURL(selectedFile)}
                            alt="Preview of your choice"
                        />
                    )}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button
                        sx={{ alignText: 'center' }}
                        onClick={addStoryHandler}
                    >
                        Добави в историята си
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default LoggedInUserStory
