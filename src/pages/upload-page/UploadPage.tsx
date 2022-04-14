/* eslint-disable jsx-a11y/label-has-associated-control */
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import PageLayout from '../../layout/PageLayout/PageLayout'

function UploadPage(): JSX.Element {
    const [selectedFile, setSelectedFile] = useState<HTMLInputElement | null>(
        null
    )

    const handleCapture = (e: any): void => {
        setSelectedFile(e.target.files[0])
    }

    const handleSubmit = (): void => {
        console.log(selectedFile)
    }

    return (
        <PageLayout>
            <Box
                sx={{
                    display: 'flex',
                    flexFlow: 'column wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '80vh',
                }}
            >
                <Typography
                    component="h1"
                    variant="body1"
                    align="center"
                    sx={{ fontWeight: '700' }}
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
                <input
                    accept="image/jpeg"
                    style={{ display: 'block' }}
                    id="userImage"
                    type="file"
                    onChange={handleCapture}
                />
                <Tooltip title="Select Image">
                    <label htmlFor="userImage">
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{
                                textTransform: 'lowercase',
                                fontWeight: 'bold',
                                bottom: '0',
                            }}
                        >
                            Качете снимката
                        </Button>
                    </label>
                </Tooltip>
            </Box>
        </PageLayout>
    )
}

export default UploadPage
