import React from 'react'
import { Form, Formik } from 'formik'
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
interface registerProps {

}


const Register: React.FC<registerProps> = ({ }) => {
    const router = useRouter()
    const [, register] = useRegisterMutation()
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ email: "", username: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {

                    const response = await register({ options: values })

                    if (response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors))
                        console.log("ERORR", response.data.register.errors)
                    } else if (response.data?.register.user) {
                        router.push('/')
                    }
                }}>
                {
                    ({ isSubmitting }) => (
                        <Form>
                            <InputField name="username" placeholder="username" label="Username" />

                            <Box mt={4}>
                                <InputField name="email" placeholder="email" label="email" />
                            </Box>

                            <Box mt={4}>
                                <InputField name="password" placeholder="password" label="Password" type="password" />
                            </Box>
                            <Button type="submit" color="teal" mt={4} isLoading={isSubmitting}>Register</Button>
                        </Form>
                    )
                }
            </Formik>
        </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient)(Register)