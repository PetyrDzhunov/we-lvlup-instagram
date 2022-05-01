import { Controller, useFormContext } from 'react-hook-form'

import TextField from '@mui/material/TextField'

type TextFieldVariant = 'standard' | 'outlined' | 'filled'
type TextFieldMargin = 'none' | 'dense' | 'normal'
type TextFieldSizes = 'small' | 'medium'

interface InputControllerProps {
    name: string
    defaultValue: string
    type: string
    label: string
    variant: TextFieldVariant
    margin?: TextFieldMargin
    placeholder?: string
    size?: TextFieldSizes
}

function InputController({
    name,
    defaultValue,
    type,
    label,
    variant,
    margin,
    placeholder,
    size,
}: InputControllerProps): JSX.Element {
    const {
        control,
        formState: { errors },
    } = useFormContext()

    return (
        <Controller
            name={name as any}
            defaultValue={defaultValue || ''}
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    type={type}
                    label={label}
                    variant={variant}
                    error={!!errors[name]}
                    helperText={errors[name] ? errors[name]?.message : ''}
                    autoComplete="auto-complete"
                    margin={margin}
                    placeholder={placeholder}
                    size={size}
                />
            )}
        />
    )
}

export default InputController
