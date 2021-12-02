import { Box, Link, Flex, Button, Heading } from '@chakra-ui/react';
import React from 'react'
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({ }) => {
    const [{ fetching: logoutfetching }, logout] = useLogoutMutation()
    const [{ data, fetching }] = useMeQuery({
        pause: isServer()
    })
    let body = null

    if (fetching) {

    } else if (!data?.me) {
        body = (
            <>

                <NextLink href="/login">
                    <Link mr={4}>Login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link >Register</Link>
                </NextLink>
            </>
        )
    } else {
        body = (
            <Flex align="center">
                <NextLink href="/create-post">
                    <Button as={Link} mr={4} ml="auto">
                        Create Post
                    </Button>
                </NextLink>
                <Box mr={2}>
                    {data.me.username}
                </Box>
                <Button variant="link" onClick={() => logout()} isLoading={logoutfetching}>Log out</Button>
            </Flex>

        )
    }
    return (
        <Flex zIndex={1} position="sticky" top={0} bg="tan" p={4} >
            <Flex align="center" maxW={800} m="auto" flex={1}>
                <NextLink href="/">
                    <Link>
                        <Heading>Social</Heading>
                    </Link>
                </NextLink>

                <Box ml="auto">
                    {body}
                </Box></Flex>
        </Flex>
    );
}