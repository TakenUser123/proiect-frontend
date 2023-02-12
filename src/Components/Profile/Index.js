import { Button, Divider, Flex, HStack, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Hooks/Auth";
import { usePosts } from "../../Hooks/Posts";
import { useUser } from "../../Hooks/Users";
import PostsList from "../Posts/PostsList";
import Avatar from "./Avatar";
import EditProfile from "./EditProfile";

export default function Profile() {
    const {id} = useParams();
    const {posts, isLoading: postsLoading} = usePosts(id);
    const {user, isLoading: userLoading} = useUser(id);
    const {user: authUser, isLoading: authLoading} = useAuth()
    const {isOpen, onOpen, onClose} = useDisclosure();
    
    if(userLoading) return "Loading...";

    return (
        <Stack spacing="5">
            <Flex p={["4","6"]} pos="relative" align="center">
                <Avatar user={user} size="2xl" />
                {!authLoading && authUser.id === user.id && (
                    <Button pos="absolute" mb="2" top="6" right="6" colorScheme="blue" onClick={onOpen}>
                        Change Avatar
                    </Button>
                )}
                <Stack ml="10">
                    <Text fontSize="xl">{user.username}</Text>
                    <HStack spacing="10">
                        <Text color="gray.700" fontSize={["sm","lg"]}>
                            Posts: {!posts ? (0) : (posts.length)}
                        </Text>
                        <Text color="gray.700" fontSize={["sm", "lg"]}>
                            Joined: {format(user.date, 'dd.MM.yyyy')}
                        </Text>
                    </HStack>
                </Stack>
                <EditProfile isOpen={isOpen} onClose={onClose} />
            </Flex>
            
            <Divider/>
            
            {postsLoading 
                ? (<Text>Posts loading...</Text>) 
                : (<PostsList posts={posts} />)
            }
        </Stack>
)}