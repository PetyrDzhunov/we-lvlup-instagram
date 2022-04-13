import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { FirebaseError } from 'firebase/app'
import { auth } from '../../config/firebase'
import InputController from '../../components/InputController'
import '../../styles/form.css'
import { firebaseService } from '../../services/firebase-service'

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
    const navigate = useNavigate()
    const [error, setError] = useState<string>('')

    const formSubmitHandler: SubmitHandler<RegisterFormInputs> = async (
        data: RegisterFormInputs
    ) => {
        const { email, fullName, password, username } = data

        try {
            const {
                user: { uid },
            } = await createUserWithEmailAndPassword(auth, email, password)
            await firebaseService.addUserToFirebaseDB(
                email,
                fullName,
                username,
                uid
            )
            // inform redux something is happening - dispatch action register/login

            navigate('/home')
        } catch (err: unknown) {
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
            </form>
        </FormProvider>
    )
}

export default RegisterForm
