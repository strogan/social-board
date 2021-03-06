import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';




const ChangePassword: NextPage = () => {
    const router = useRouter()

    const [, changePassword] = useChangePasswordMutation()
    const [tokenError, setTokenError] = useState('')
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ newPassword: "" }}
                onSubmit={async (values, { setErrors }) => {

                    const response = await changePassword({ newPassword: values.newPassword, token: typeof router.query.token === "string" ? router.query.token : "" })
                    console.log(response)
                    if (response.data?.changePassword.errors) {
                        const errorMap = toErrorMap(response.data.changePassword.errors)
                        console.log(errorMap)
                        if ('token' in errorMap) {
                            setTokenError(errorMap.token)
                        }
                        setErrors(errorMap)
                    } else if (response.data?.changePassword.user) {
                        router.push('/')
                    }
                }}>
                {({ isSubmitting }) => (
                    <Form>
                        <Box mt={4}>
                            <InputField name="newPassword" placeholder="New Password" label="New Password" type="password" />
                        </Box>
                        {tokenError ? <Box>{tokenError}</Box> : null}
                        <Button type="submit" color="teal" mt={4} isLoading={isSubmitting}>Change Password</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper >
    )
}




export default withUrqlClient(createUrqlClient)(ChangePassword)
