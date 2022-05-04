/* eslint-disable default-case */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ButtonGroup from '@mui/material/ButtonGroup'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import CircularProgress from '@mui/material/CircularProgress'

import '../../styles/file-input.css'
import '../../styles/image-preview.css'
import Error from '../../components/Error'
import { PageProps, Post } from '../../types'
import { storage } from '../../config/firebase'
import { addPost } from '../../store/posts/postsSlice'
import PageLayout from '../../layout/PageLayout/PageLayout'
import { firebasePostsService } from '../../services/firebase-service'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import FlexBoxCentered from '../../components/FlexBoxCentered'

function UploadPage({ title }: PageProps): JSX.Element {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)
    const [description, setDescription] = useState<string>('')
    const [hasSetDescription, setHasDescription] = useState<boolean>(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { isAuthenticated, email, uid } = useAppSelector(
        (state) => state.persistedReducer.auth
    )
    useEffect(() => {
        if (!isAuthenticated) {
            return navigate('/')
        }
    }, [isAuthenticated, navigate])

    const handleClickOpen = (): void => {
        setOpen(true)
    }

    const handleClose = (): void => {
        setOpen(false)
    }

    const handleAddText = async (): Promise<void> => {
        setOpen(false)
        setHasDescription(true)
    }

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setDescription(e.target.value)
    }

    const handleFileChange = (e: Event): void => {
        const input = e.target as HTMLInputElement
        if (input.files && input.files.length > 0) {
            setSelectedFile(input.files[0])
        }
    }

    const addFileToDatabaseHandler = (): void => {
        const storageRef = ref(storage, `images/${selectedFile?.name}`)
        if (!selectedFile) {
            setError('You must provide an image for the post.')
            return
        }
        setIsLoading(true)
        uploadBytes(storageRef, selectedFile as Blob)
            .then(() => {
                getDownloadURL(storageRef)
                    .then((url) => {
                        const newPost: Post = {
                            creator: { email, uid },
                            likedBy: [],
                            dislikes: [],
                            comments: [],
                            image: url,
                            id: '',
                            description,
                        }
                        dispatch(addPost(newPost))
                        firebasePostsService
                            .createPost(newPost)
                            .then(() => {
                                setIsLoading(false)
                                navigate('/')
                            })
                            .catch((err) => setError(err.message))
                    })
                    .catch((err) => setError(err.message))
            })
            .catch((err) => setError(err.message))
    }

    const removeFileHandler = (): void => {
        setSelectedFile(null)
        setDescription('')
        setHasDescription(false)
    }

    return (
        <PageLayout>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <FlexBoxCentered flexDirection="column wrap">
                <Typography
                    component="h1"
                    variant="body1"
                    align="center"
                    sx={{ fontWeight: '700', marginTop: '10px' }}
                >
                    Създаване на нова публикация
                </Typography>
                <Divider sx={{ marginTop: '10px', width: '100%' }} />
                <PhotoCameraIcon sx={{ fontSize: '7em', marginTop: '2rem' }} />
                <Typography
                    variant="h6"
                    align="center"
                    component="h3"
                    sx={{
                        fontWeight: '300',
                        color: 'text.primary',
                    }}
                >
                    Добавете снимки и видеоклипове, за да създадете нова
                    публикация.
                </Typography>
                <div className="file-input">
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
                    <label htmlFor="userImage">Изберете файл</label>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Добави описание за твоя пост</DialogTitle>
                        <DialogContent>
                            <TextField
                                onChange={handleDescriptionChange}
                                multiline
                                autoFocus
                                margin="dense"
                                id="description"
                                label="Описание"
                                type="email"
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Назад</Button>
                            <Button onClick={handleAddText}>
                                Добави описание
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {error && <Error error={error} />}

                    {isLoading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress size="1.5em" />
                        </Box>
                    )}
                </div>

                {selectedFile && (
                    <img
                        className="image-preview"
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview of your choice"
                    />
                )}
                {hasSetDescription && <Typography>{description}</Typography>}
                {selectedFile && (
                    <ButtonGroup
                        sx={{ marginBottom: '60px' }}
                        variant="contained"
                    >
                        <Button
                            onClick={addFileToDatabaseHandler}
                            sx={{
                                textTransform: 'lowercase',
                                fontWeight: 'bold',
                                margin: '4px',
                            }}
                            disabled={isLoading}
                        >
                            качи
                        </Button>
                        <Button
                            onClick={handleClickOpen}
                            sx={{
                                textTransform: 'lowercase',
                                fontWeight: 'bold',
                                margin: '4px',
                            }}
                        >
                            Опиши
                        </Button>
                        <Button
                            onClick={removeFileHandler}
                            sx={{
                                textTransform: 'lowercase',
                                fontWeight: 'bold',
                                margin: '4px',
                            }}
                        >
                            Премахни
                        </Button>
                    </ButtonGroup>
                )}
            </FlexBoxCentered>
        </PageLayout>
    )
}

export default UploadPage
