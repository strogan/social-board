import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import NextLink from 'next/link'
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Button } from "@chakra-ui/button";

const Index = () => {
    const [variables, setVariables] = useState({ limit: 10, cursor: null as null | string })
    const [{ data, fetching }] = usePostsQuery({
        variables
    })

    if (!fetching && !data) {
        return (<div>you got query for some reason</div>)
    }

    return (
        <Layout>
            <Flex align="center">
                <Heading>Social App Posts</Heading>
                <NextLink href="/create-post">
                    <Link ml="auto">
                        Create Post
                    </Link>
                </NextLink>
            </Flex>

            <br />

            {!data && fetching ? <div>loading...</div> :

                <Stack spacing={8}>

                    {data.posts.posts.map((post) =>

                        <Box key={post.id} p={5} shadow="md" borderWidth="1px">
                            <Heading fontSize="xl">{post.title} {post.id}</Heading>
                            <Text mt={4}>{post.textSnippet}</Text>
                        </Box>

                    )}



                </Stack>



            }
            {data && data.posts.hasMore ?
                <Flex>
                    <Button onClick={() => setVariables({
                        limit: variables.limit,
                        cursor: data.posts.posts[data.posts.posts.length - 1].createdAt
                    })} isLoading={fetching} m="auto" my={8}>
                        load more
                    </Button>
                </Flex> : null}

        </Layout>
    )

};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
