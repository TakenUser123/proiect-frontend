import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Hooks/Auth";
import { useAddComment } from "../../Hooks/Comments";
import Avatar from "../Profile/Avatar";

export default function NewComment({post}) {
    const{id:postID}=post;
    const {user, isLoading: authLoading} = useAuth()
    const {register, handleSubmit, reset} = useForm();
    const {addComment, isLoading: commentLoading} = useAddComment({postID, uid: user?.id});

    function handleAddComment(data){
        addComment(data.text);
        reset();
    }

    if(authLoading) return "Loading...";
    
    return (
        <Box maxW="600px" mx="auto" py="6">
            <Flex padding="4">
                <Avatar user={user} size="md" />
                <Box flex="1" ml="4">
                    <form onSubmit={handleSubmit(handleAddComment)}>
                        <Box>
                            <Input 
                                size="sm"
                                variant="flushed"
                                placeholder="Write comment..."
                                autoComplete="off"
                                {...register('text', {required:true})}
                            />
                        </Box>
                        <Flex pt="2">
                            <Button
                                isLoading={commentLoading || authLoading}
                                type="submit"
                                colorScheme="blue"
                                size="xs"
                                ml="auto"
                            >Add Comment
                            </Button>
                        </Flex>
                    </form>
                </Box>
            </Flex>
        </Box>
)}
