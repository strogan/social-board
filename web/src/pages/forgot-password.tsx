import { Box, Flex, Link, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';

import React, { useState } from 'react'
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { createUrqlClient } from '../utils/createUrqlClient';

import { useForgotPasswordMutation } from '../generated/graphql'


const forgotPassword: React.FC<{}> = ({ }) => {
    const [complete, setComplete] = useState(false)
    const [, forgotPassword] = useForgotPasswordMutation()
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ email: "" }}
                onSubmit={async (values) => {

                    await forgotPassword(values)
                    setComplete(true)
                }}>
                {
                    ({ isSubmitting }) => complete ? <Box>if an account is excist we will send email</Box> : (
                        <Form>
                            <InputField name="email" placeholder="Email" label="Email" />


                            <Button type="submit" color="teal" mt={4} isLoading={isSubmitting}>Forgot Password</Button>
                        </Form>
                    )
                }
            </Formik>
        </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient)(forgotPassword)