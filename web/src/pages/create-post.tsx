import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import router from 'next/router';
import React, { useEffect } from 'react'
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { Wrapper } from '../components/Wrapper';
import { useCreatePostMutation, useMeQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useIsAuth } from '../utils/useIsAuth';




const createPost: React.FC<{}> = ({ }) => {

    const [, createPost] = useCreatePostMutation()
    useIsAuth()
    return (
        <Layout variant="small">
            <Formik
                initialValues={{ title: "", text: "" }}
                onSubmit={async (values) => {

                    const { error } = await createPost({ input: values })
                    if (!error) { router.push("/") }

                }}>
                {
                    ({ isSubmitting }) => (
                        <Form>
                            <InputField name="title" placeholder="Title" label="Title" />

                            <Box mt={4}>
                                <InputField name="text" placeholder="text..." label="Body" textarea />
                            </Box>

                            <Button type="submit" color="teal" mt={4} isLoading={isSubmitting}>Create Post</Button>
                        </Form>
                    )
                }
            </Formik>
        </Layout>
    );
}


export default withUrqlClient(createUrqlClient)(createPost)