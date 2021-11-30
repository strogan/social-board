import React from 'react'
import { Form, Formik } from 'formik'
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';


const Login: React.FC<{}> = ({ }) => {
    const router = useRouter()
    const [, login] = useLoginMutation()
    return (
        <>
            <Wrapper variant="small">
                <Formik
                    initialValues={{ username: "", password: "" }}
                    onSubmit={async (values, { setErrors }) => {

                        const response = await login(values)

                        if (response.data?.login.errors) {
                            setErrors(toErrorMap(response.data.login.errors))
                            console.log("ERORR", response.data.login.errors)
                        } else if (response.data?.login.user) {
                            router.push('/')
                        }
                    }}>
                    {
                        ({ isSubmitting }) => (
                            <Form>
                                <InputField name="username" placeholder="username" label="Username" />

                                <Box mt={4}>
                                    <InputField name="password" placeholder="password" label="Password" type="password" />
                                </Box>
                                <Button type="submit" color="teal" mt={4} isLoading={isSubmitting}>login</Button>
                            </Form>
                        )
                    }
                </Formik>
            </Wrapper>
        </>
    );
}

export default withUrqlClient(createUrqlClient)(Login)