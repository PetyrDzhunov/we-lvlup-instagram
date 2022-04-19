/* eslint-disable default-case */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { useEffect, useState } from 'react'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import CircularProgress from '@mui/material/CircularProgress'
import PageLayout from '../../layout/PageLayout/PageLayout'
import '../../styles/file-input.css'
import { PageProps, Post } from '../../types'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import '../../styles/image-preview.css'

import { storage } from '../../config/firebase'
import { firebaseService } from '../../services/firebase-service'
import { addPost } from '../../store/posts/postsSlice'

function UploadPage({ title }: PageProps): JSX.Element {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
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
                            likes: [],
                            dislikes: [],
                            comments: [],
                            image: url,
                            id: '',
                        }
                        firebaseService
                            .createPost(newPost)
                            .then(() => {
                                setIsLoading(false)
                                dispatch(addPost(newPost))
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
    }

    return (
        <PageLayout>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Box
                sx={{
                    display: 'flex',
                    flexFlow: 'column wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
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
                        color: 'rgba(38,38,38,0.7)',
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
                    {error && (
                        <Typography
                            align="center"
                            color="error"
                            variant="body2"
                            sx={{ fontWeight: 'bolder', marginTop: '10px' }}
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
                </div>
                {selectedFile && (
                    <img
                        className="image-preview"
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview of your choice"
                    />
                )}
                <ButtonGroup
                    variant="outlined"
                    sx={{
                        position: 'absolute',
                        bottom: '65px',
                    }}
                >
                    <Button
                        onClick={addFileToDatabaseHandler}
                        sx={{
                            textTransform: 'lowercase',
                            fontWeight: 'bold',
                        }}
                        disabled={isLoading}
                    >
                        Качете снимката
                    </Button>
                    <Button
                        onClick={removeFileHandler}
                        sx={{
                            textTransform: 'lowercase',
                            fontWeight: 'bold',
                        }}
                    >
                        Махнете снимката
                    </Button>
                </ButtonGroup>
            </Box>
        </PageLayout>
    )
}

export default UploadPage
