import { Flex, IconButton } from "@chakra-ui/react";
import {FaRegHeart, FaHeart, FaComment, FaRegComment, FaTrash} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../Hooks/Auth";
import { useComments } from "../../Hooks/Comments";
import {useToggleLike, useDeletePost } from "../../Hooks/Posts";
import { PROTECTED } from "../../lib/Routes";


export default function Actions({post}) {
    const {likes, id, uid} = post;
    const {user, isLoading: userLoading} = useAuth();
    const isLiked = likes.includes(user?.id);
    const {toggleLike, isLoading: likeLoading} = useToggleLike({id, isLiked, uid: user?.id});
    const {deletePost, isLoading: deleteLoading} = useDeletePost(id);
    const {comments, isLoading: commentsLoading} = useComments(id);
    
    return (
        <Flex p="2">
            <Flex alignItems="center">
                <IconButton 
                    onClick={toggleLike}
                    isLoading={likeLoading || userLoading}
                    size="md"
                    colorScheme="red"
                    variant="ghost"
                    icon = {isLiked ? <FaHeart/> : <FaRegHeart />}
                    isRound
                /> {likes.length}
            </Flex>
            <Flex alignItems="center" ml="2">
                <IconButton 
                    as={Link}
                    to={`${PROTECTED}/comments/${id}`}
                    isLoading={commentsLoading}
                    size="md"
                    colorScheme="blue"
                    variant="ghost"
                    icon = {comments?.length!==0 ? <FaComment/> : <FaRegComment />}
                    isRound
                /> {comments?.length}
            </Flex>
            <Flex alignItems="center" ml="auto">
                {!userLoading && user.id === uid &&(
                    <IconButton
                        onClick={deletePost}
                        isLoading={deleteLoading}
                        size="md"
                        colorScheme="red"
                        variant="ghost"
                        icon = {<FaTrash />}
                        isRound
                    /> 
                )}  
            </Flex>
        </Flex>
)}
