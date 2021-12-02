import { Box, Heading } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import React from 'react'
import { EditDeletePostButtons } from '../../components/EditDeletePostButtons';
import { Layout } from '../../components/Layout';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { usePostGetFromUrl } from '../../utils/usePostGetFromUrl';



const Post = ({ }) => {

    const [{ data, error, fetching }] = usePostGetFromUrl()

    if (fetching) {
        return (
            <Layout>
                <div>Loading...</div>
            </Layout>
        )
    }
    if (error) return <div>{error.message}</div>
    if (!data?.post) return <Layout><div>No post found</div></Layout>

    return (
        <Layout>
            <Heading mb={4}>
                {data.post.title}
            </Heading>
            <Box mb={4}>{data.post.text}</Box>
            <EditDeletePostButtons id={data.post.id} creatorId={data.post.creator.id} />
        </Layout>
    );
}


export default withUrqlClient(createUrqlClient, { ssr: true })(Post)