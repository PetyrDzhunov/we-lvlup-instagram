import { useState } from 'react'
import { FirebaseError } from 'firebase/app'
import { useNavigate } from 'react-router-dom'
import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FacebookIcon from '@mui/icons-material/Facebook'
import CircularProgress from '@mui/material/CircularProgress'

import { auth } from '../config/firebase'
import { login } from '../store/auth/authSlice'
import { useAppDispatch } from '../hooks/redux-hooks'
import { firebaseUsersService } from '../services/firebase-service'

import Error from './Error'
import FlexBoxCentered from './FlexBoxCentered'

interface LoginWithFacebookProps {
    contained?: boolean
}

const provider = new FacebookAuthProvider()
provider.addScope('user_birthday')

function LoginWithFacebook({ contained }: LoginWithFacebookProps): JSX.Element {
    const [error, setError] = useState<string>('')
    const [isRegistering, setIsRegistering] = useState<boolean>(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const LoadingSpinner = isRegistering && (
        <FlexBoxCentered flexDirection="row wrap">
            <CircularProgress size="1.5em" />
        </FlexBoxCentered>
    )

    const loginWithFacebookHandler = async (): Promise<void> => {
        try {
            setIsRegistering(true)
            const result = await signInWithPopup(auth, provider)
            await firebaseUsersService.addUserToFirebaseDBLoggedInWithFacebook(
                result.user.email,
                result.user.uid
            )
            navigate('/')
            const userObject = {
                email: result.user.email!,
                uid: result.user.uid,
                fullName: result.user.displayName!,
            }
            dispatch(login(userObject))
            setIsRegistering(false)
        } catch (err) {
            setIsRegistering(false)
            if (err instanceof FirebaseError) {
                if (
                    err.code.includes(
                        'auth/account-exists-with-different-credential'
                    )
                ) {
                    setError('You already have registration with email!')
                } else {
                    setError('Unable to login. Please try again later')
                }
            }
        }
    }

    if (contained) {
        return (
            <FlexBoxCentered
                flexDirection="row wrap"
                sx={{
                    height: '40px',
                    margin: '20px',
                }}
            >
                <Button variant="contained" disabled={isRegistering}>
                    <FlexBoxCentered
                        flexDirection="row wrap"
                        onClick={loginWithFacebookHandler}
                        component="article"
                        sx={{
                            alignItems: 'center',
                            marginTop: '0px',
                        }}
                    >
                        <FacebookIcon sx={{ color: '#FFFFFF' }} />
                        <Typography
                            paragraph
                            variant="body2"
                            margin="10px"
                            sx={{ fontWeight: 'bold', color: '#FFFFFF' }}
                        >
                            Login with Facebook
                        </Typography>
                    </FlexBoxCentered>
                    {error && <Error error={error} />}
                </Button>
                {LoadingSpinner}
            </FlexBoxCentered>
        )
    }
    return (
        <Button disabled={isRegistering}>
            <FlexBoxCentered
                flexDirection="row wrap"
                onClick={loginWithFacebookHandler}
                component="article"
                sx={{
                    marginTop: '15px',
                }}
            >
                <FacebookIcon color="primary" />
                <Typography
                    paragraph
                    variant="body2"
                    margin="10px"
                    sx={{ fontWeight: 'bold', color: '#385185' }}
                >
                    Login with Facebook
                </Typography>
                {error && <Error error={error} />}
                {LoadingSpinner}
            </FlexBoxCentered>
        </Button>
    )
}

export default LoginWithFacebook
