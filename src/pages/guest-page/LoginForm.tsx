import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from '@mui/material/Button'
import InputController from '../../components/InputController'
import '../../styles/login-form.css'

interface LoginFormInputs {
    email: string
    password: string
}

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(20).required(),
})

const formSubmitHandler: SubmitHandler<LoginFormInputs> = (
    data: LoginFormInputs
) => {
    console.log('data', data)
}

function LoginForm(): JSX.Element {
    const methods = useForm<LoginFormInputs>({
        resolver: yupResolver(schema),
    })

    return (
        <FormProvider {...methods}>
            <form
                className="login-form"
                onSubmit={methods.handleSubmit(formSubmitHandler)}
            >
                <InputController
                    name="email"
                    defaultValue=""
                    label="Email"
                    type="email"
                    variant="outlined"
                    margin="dense"
                    placeholder="Телефонен номер, потребителско име или имейл"
                    size="small"
                />

                <InputController
                    name="password"
                    defaultValue=""
                    label="Password"
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
            </form>
        </FormProvider>
    )
}
export default LoginForm
