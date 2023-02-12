import { Box, Button, Heading, HStack, Textarea } from "@chakra-ui/react";
import reactTextareaAutosize from "react-textarea-autosize";
import {useForm} from "react-hook-form";
import {useAuth} from "../../Hooks/Auth";
import { useAddPost, usePosts } from "../../Hooks/Posts";
import PostsList from "../Posts/PostsList";

function NewPost(){
  const {register, handleSubmit, reset} = useForm();
  const {addPost, isLoading: addingPost} = useAddPost();
  const {user, isLoading: authLoading} = useAuth();

  function handleAddPost(data){
    addPost({
      uid: user.id,
      text: data.text,
    });
    reset();
  }
  
  return (
    <Box maxW="600px" mx="auto" py="10">
      <form onSubmit={handleSubmit(handleAddPost)}>
        <HStack justify="space-between">
          <Heading size="lg" textColor="blue.400">New Post</Heading>
          <Button 
            colorScheme="blue" 
            size="md" 
            type="submit" 
            isLoading={authLoading || addingPost}
            loadingText="Loading"
          >Post
          </Button>
        </HStack>
        <Textarea 
          as={reactTextareaAutosize} 
          resize="none" 
          mt="5" 
          placeholder="Create a new post..." 
          minRows={3} 
          maxRows={15} 
          {...register("text",{required: true})}
        />
      </form>
    </Box>
)}


export default function Dashboard() {
  const {posts, isLoading} = usePosts();
  
  if(isLoading) return "Loading...";

  return (
    <>
      <NewPost />
      <PostsList posts={posts} />
    </>
)}
