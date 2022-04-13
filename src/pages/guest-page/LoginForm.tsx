import { signInWithEmailAndPassword } from 'firebase/auth'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from '@mui/material/Button'
import '../../styles/form.css'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../config/firebase'
import InputController from '../../components/InputController'

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
    const navigate = useNavigate()
    const [error, setError] = useState<string>('')

    const formSubmitHandler: SubmitHandler<LoginFormInputs> = async (
        data: LoginFormInputs
    ) => {
        const { email, password } = data
        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
            // this also returns the UID authentication which we have in our registered users table as authID ?
            // this may be used for some kind of connection between those 2?...
            // also an acessToken? should we use that for something?
            // inform redux something just happened dispatch login action
            console.log(user)
            navigate('/home')
        } catch (err: unknown) {
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
                >
                    Вход
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
export default LoginForm
