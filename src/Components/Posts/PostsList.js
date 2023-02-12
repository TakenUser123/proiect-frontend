import { Box, Text } from "@chakra-ui/react";
import Post from "./Index";

export default function PostsList({posts}) {
  return( 
    <Box px="4" align="center">
        {posts?.length===0 
          ? (<Text textAlign="center" fontSize="xl">No posts</Text>) 
          : posts?.map(post => <Post key={post.id} post={post}/>)}
    </Box>
)}