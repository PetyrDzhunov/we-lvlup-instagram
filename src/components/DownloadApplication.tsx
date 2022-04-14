/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Slide, { SlideProps } from '@mui/material/Slide'

type TransitionProps = Omit<SlideProps, 'direction'>

function TransitionUp(props: TransitionProps): JSX.Element {
    return <Slide {...props} direction="up" />
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

function DownloadApplication(): JSX.Element {
    const [open, setOpen] = useState<boolean>(false)

    const [transition, setTransition] = useState<
        React.ComponentType<TransitionProps> | undefined
    >(undefined)

    const handleClick =
        (Transition: React.ComponentType<TransitionProps>) => () => {
            setTransition(() => Transition)
            setOpen(true)
        }

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ): void => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }
    return (
        <Box component="section">
            <Typography
                variant="body2"
                paragraph
                align="center"
                sx={{ marginTop: '30px' }}
            >
                Изтеглете приложението
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexFlow: 'row wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: '5px',
                }}
            >
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    TransitionComponent={transition}
                    key={transition ? transition.name : ''}
                >
                    <Alert
                        onClose={handleClose}
                        severity="info"
                        sx={{
                            width: '100%',
                            textAlign: 'center',
                        }}
                    >
                        This application is for practice purposes only.
                    </Alert>
                </Snackbar>
                <img
                    onClick={handleClick(TransitionUp)}
                    className="download-image app"
                    alt="download from apple store"
                    src="https://w7.pngwing.com/pngs/440/692/png-transparent-app-store-apple-logo-apple-text-logo-microsoft-store.png"
                />

                <img
                    onClick={handleClick(TransitionUp)}
                    className="download-image"
                    alt="download from google play"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png"
                />
            </Box>
        </Box>
    )
}

export default DownloadApplication
