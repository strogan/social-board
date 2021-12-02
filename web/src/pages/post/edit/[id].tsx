import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import router from 'next/router';
import React from 'react'
import { InputField } from '../../../components/InputField';
import { Layout } from '../../../components/Layout';
import { usePostQuery, useUpdatePostMutation } from '../../../generated/graphql';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { useGetIntId } from '../../../utils/useGetIntId';
import { usePostGetFromUrl } from '../../../utils/usePostGetFromUrl';



const EditPost = ({ }) => {
    const intId = useGetIntId()
    const [{ data, error, fetching }] = usePostQuery({
        pause: intId === -1,
        variables: {
            id: intId,
        },
    })
    const [, updatePost] = useUpdatePostMutation()

    if (fetching) return (<Layout>Loading...</Layout>)

    if (error) return <div>{error.message}</div>
    if (!data?.post) return <Layout><div>No post found</div></Layout>

    return (<Layout variant="small">
        <Formik
            initialValues={{ title: data.post.title, text: data.post.text }}
            onSubmit={async (values) => {
                await updatePost({
                    id: intId,
                    ...values
                })
                router.back() // router.push("/") //


            }}>
            {
                ({ isSubmitting }) => (
                    <Form>
                        <InputField name="title" placeholder="Title" label="Title" />

                        <Box mt={4}>
                            <InputField name="text" placeholder="text..." label="Body" textarea />
                        </Box>

                        <Button type="submit" color="teal" mt={4} isLoading={isSubmitting}>Update Post</Button>
                    </Form>
                )
            }
        </Formik>
    </Layout>);
}


export default withUrqlClient(createUrqlClient)(EditPost);