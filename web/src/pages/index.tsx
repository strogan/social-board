import { Link } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import NextLink from 'next/link'
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {

    const [{ data }] = usePostsQuery()

    return (
        <Layout>
            <NextLink href="/create-post">
                <Link>
                    Create Post
                </Link>
            </NextLink>
            <div>Posts</div>
            <br />
            {!data ? <div>loading...</div> : data.posts.map((post) => <div key={post.id}>{post.title}</div>)}

        </Layout>
    )

};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
