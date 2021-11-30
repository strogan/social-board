
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { FieldInputProps, useField } from 'formik';
import React from 'react'

type InputFieldProps = FieldInputProps<any> & {
    label: string,
    name: string,
    placeholder: string,
    type: string,

}

export const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
    const [field, { error }] = useField(props)

    return (<FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <Input {...field} {...props} id={field.name} />

        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>);
}