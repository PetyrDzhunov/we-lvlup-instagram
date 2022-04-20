import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { useState } from 'react'
import { FirebaseError } from 'firebase/app'
import Box from '@mui/material/Box'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { auth } from '../../config/firebase'
import InputController from '../../components/InputController'
import '../../styles/form.css'
import { firebaseService } from '../../services/firebase-service'
import { login } from '../../store/auth/authSlice'

interface RegisterFormInputs {
    email: string
    fullName: string
    username: string
    password: string
}

const schema = yup.object().shape({
    email: yup.string().email().required(),
    fullName: yup.string().min(6).max(40),
    username: yup.string().min(6).max(20),
    password: yup.string().min(6).max(20).required(),
})

function RegisterForm(): JSX.Element {
    const methods = useForm<RegisterFormInputs>({
        resolver: yupResolver(schema),
    })

    const dispatch = useAppDispatch()

    const navigate = useNavigate()
    const [error, setError] = useState<string>('')
    const [isRegistering, setIsRegistering] = useState<boolean>(false)

    const formSubmitHandler: SubmitHandler<RegisterFormInputs> = async (
        data: RegisterFormInputs
    ) => {
        const { email, fullName, password, username } = data

        try {
            setIsRegistering(true)
            const {
                user: { uid },
            } = await createUserWithEmailAndPassword(auth, email, password)

            await firebaseService.addUserToFirebaseDB(
                email,
                fullName,
                username,
                uid
            )
            dispatch(login({ email, uid, fullName }))
            setIsRegistering(false)
            navigate('/')
        } catch (err: unknown) {
            setIsRegistering(false)
            if (err instanceof FirebaseError) {
                if (err.code.includes('auth/weak-password')) {
                    setError('Please enter a stronger password')
                } else if (err.code.includes('auth/email-already-in-use')) {
                    setError('Email already in use')
                } else {
                    setError('Unable to register. Please try again later.')
                }
            }
        }
    }

    return (
        <FormProvider {...methods}>
            <form
                className="form"
                onSubmit={methods.handleSubmit(formSubmitHandler)}
            >
                <InputController
                    name="email"
                    defaultValue=""
                    label="Мобилен номер или имейл"
                    type="email"
                    variant="outlined"
                    margin="dense"
                    placeholder="Мобилен номер или имейл"
                    size="small"
                />

                <InputController
                    name="fullName"
                    defaultValue=""
                    label="Пълно име"
                    type="text"
                    variant="outlined"
                    margin="dense"
                    placeholder="Пълно име"
                    size="small"
                />

                <InputController
                    name="username"
                    defaultValue=""
                    label="Потребителско име"
                    type="text"
                    variant="outlined"
                    margin="dense"
                    placeholder="Потребителско име"
                    size="small"
                />

                <InputController
                    name="password"
                    defaultValue=""
                    label="Парола"
                    type="password"
                    variant="outlined"
                    margin="dense"
                    placeholder="Парола"
                    size="small"
                />
                <Button
                    sx={{
                        marginTop: '10px',
                        textTransform: 'capitalize',
                        fontWeight: '600',
                    }}
                    type="submit"
                    variant="contained"
                    fullWidth
                    color="primary"
                    disabled={isRegistering}
                >
                    Напред
                </Button>
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
                {isRegistering && (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress size="1.5em" />
                    </Box>
                )}
            </form>
        </FormProvider>
    )
}

export default RegisterForm
