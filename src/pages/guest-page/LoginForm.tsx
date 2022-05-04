import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'

import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import '../../styles/form.css'
import Error from '../../components/Error'
import { auth } from '../../config/firebase'
import { login } from '../../store/auth/authSlice'
import { useAppDispatch } from '../../hooks/redux-hooks'
import InputController from '../../components/InputController'
import FlexBoxCentered from '../../components/FlexBoxCentered'

interface LoginFormInputs {
    email: string
    password: string
}

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(20).required(),
})

function LoginForm(): JSX.Element {
    const methods = useForm<LoginFormInputs>({
        resolver: yupResolver(schema),
    })
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState<string>('')
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false)

    const formSubmitHandler: SubmitHandler<LoginFormInputs> = async (
        data: LoginFormInputs
    ) => {
        const { email, password } = data
        try {
            setIsLoggingIn(true)
            const response = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
            dispatch(
                login({
                    email,
                    uid: response.user.uid,
                    fullName: response.user.displayName!,
                })
            )
            setIsLoggingIn(false)

            navigate('/')
        } catch (err: unknown) {
            setIsLoggingIn(false)

            if (err instanceof FirebaseError) {
                if (err.code.includes('auth/user-not-found')) {
                    setError('User not found.')
                } else if (err.code.includes('auth/wrong-password')) {
                    setError('Wrong password.')
                } else {
                    setError('Unable to login. Please try again later.')
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
                    label="Потребителско име или имейл"
                    type="email"
                    variant="outlined"
                    margin="dense"
                    placeholder="Телефонен номер, потребителско име или имейл"
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
                    sx={{ marginTop: '10px', textTransform: 'capitalize' }}
                    type="submit"
                    variant="contained"
                    fullWidth
                    color="primary"
                    disabled={isLoggingIn}
                >
                    Вход
                </Button>
                {error && <Error error={error} />}

                {isLoggingIn && (
                    <FlexBoxCentered
                        flexDirection="row wrap"
                        sx={{
                            marginTop: '15px',
                        }}
                    >
                        <CircularProgress size="1.5em" />
                    </FlexBoxCentered>
                )}
            </form>
        </FormProvider>
    )
}
export default LoginForm
