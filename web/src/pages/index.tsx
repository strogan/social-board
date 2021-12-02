import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import NextLink from 'next/link'
import { useDeletePostMutation, useMeQuery, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Button, IconButton } from "@chakra-ui/button";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { UpdootSection } from "../components/UpdootSection";
import { EditDeletePostButtons } from "../components/EditDeletePostButtons";

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


            {!data && fetching ? <div>loading...</div> :

                <Stack spacing={8}>

                    {data.posts.posts.map((post) =>
                        !post ? null : (
                            <Flex key={post.id} p={5} shadow="md" borderWidth="1px">
                                <UpdootSection post={post} />
                                <Box flex={1}>
                                    <NextLink href="/post/[id]" as={`/post/${post.id}`}>
                                        <Link>
                                            <Heading fontSize="xl">{post.title}</Heading>
                                        </Link>
                                    </NextLink>

                                    <Text>created by {post.creator.username}</Text>


                                    <Flex align="center">
                                        <Text flex={1} mt={4}>{post.textSnippet}</Text>



                                        <EditDeletePostButtons id={post.id} creatorId={post.creator.id} />


                                    </Flex>

                                </Box>
                            </Flex>)

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
