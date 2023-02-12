import { Box, Button, Stack } from "@chakra-ui/react";
import {USERS, PROTECTED} from "../../lib/Routes";
import { Link } from "react-router-dom";
import { useAuth } from "../../Hooks/Auth";
import Avatar from "../Profile/Avatar";

function ActiveUser(){
  const {user, isLoading} = useAuth();
  
  if(isLoading) return "Loading...";

  return( 
    <Stack align="center" spacing="5" my="8">
      <Avatar user={user} />
      <Box backgroundColor="gray.500" textColor="white">@{user.username}</Box>
      <Button colorScheme="blue" w="full" as={Link} to={`${PROTECTED}/profile/${user.id}`}>
        Edit Profile
      </Button>
    </Stack>
)}

export default function Sidebar() {
  return (
    <Box
      px="6"
      height="100vh"
      w="40%"
      maxW="300px"
      borderLeft="1px solid"
      borderLeftColor="blue.100"
      position="sticky"
      top="16"
      display={{base: "none", md:"block"}}
    >
      <ActiveUser />
      <Box 
        as="ul"
        align="center"
        borderBottom="2px solid"
        borderColor="blue.200"
      />
    </Box>
)}
