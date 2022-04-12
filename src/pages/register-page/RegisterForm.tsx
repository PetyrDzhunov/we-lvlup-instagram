import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from '@mui/material/Button'
import InputController from '../../components/InputController'
import '../../styles/form.css'

interface RegisterFormInputs {
    email: string
    fullName: string
    userName: string
    password: string
}

const schema = yup.object().shape({
    email: yup.string().email().required(),
    fullName: yup.string().min(6).max(40),
    username: yup.string().min(6).max(20),
    password: yup.string().min(6).max(20).required(),
})

const formSubmitHandler: SubmitHandler<RegisterFormInputs> = (
    data: RegisterFormInputs
) => {
    console.log('data', data)
}

function RegisterForm(): JSX.Element {
    const methods = useForm<RegisterFormInputs>({
        resolver: yupResolver(schema),
    })

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
                    name="email"
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
            </form>
        </FormProvider>
    )
}
export default RegisterForm
