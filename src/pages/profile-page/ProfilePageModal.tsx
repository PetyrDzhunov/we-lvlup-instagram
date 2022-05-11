import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import List from '@mui/material/List'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

import { User } from '../../types'

export interface DialogTitleProps {
    id: string
    children?: React.ReactNode
    onClose: () => void
}

function BootstrapDialogTitle(props: DialogTitleProps): JSX.Element {
    const { children, onClose, ...other } = props
    return (
        <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center' }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    )
}

interface ProfilePageModalProps {
    users: User[]
    text: string
    count?: number
}

function ProfilePageModal({
    users,
    text,
    count,
}: ProfilePageModalProps): JSX.Element {
    const [open, setOpen] = useState<boolean>(false)
    const handleClickOpen = (): void => {
        setOpen(true)
    }

    const handleClose = (): void => {
        setOpen(false)
    }

    const navigate = useNavigate()

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }))

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Show {text}
                <Typography sx={{ marginLeft: '40px' }}>{count}</Typography>
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    {text}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <List>
                        {users?.map((currUser) => (
                            <Stack
                                key={currUser?.authID}
                                direction="row"
                                spacing={2}
                                alignItems="center"
                                sx={{
                                    margin: '15px',
                                }}
                            >
                                <Avatar
                                    onClick={() => {
                                        navigate(`/profile/${currUser?.authID}`)
                                        setOpen(false)
                                    }}
                                    src={currUser?.profileImage}
                                    sx={{ width: '40px', height: '40px' }}
                                />
                                <Typography
                                    sx={{
                                        fontWeight: 'bolder',
                                        marginBottom: '4px',
                                    }}
                                >
                                    {currUser?.username ||
                                        currUser?.fullName ||
                                        currUser?.email.split('@')[0]}
                                </Typography>
                            </Stack>
                        ))}
                    </List>
                </DialogContent>
            </BootstrapDialog>
        </>
    )
}

export default ProfilePageModal
