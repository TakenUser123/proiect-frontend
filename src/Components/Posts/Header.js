import {Box, Flex, Text} from '@chakra-ui/react';
import { useUser } from '../../Hooks/Users';
import Avatar from '../Profile/Avatar';
import { formatDistanceToNow } from 'date-fns';
import UsernameButton from '../Profile/UsernameButton';


export default function Header({post}) {
  const {uid, date} = post;
  const {user, isLoading} = useUser(uid);

  if(isLoading) return "Loading...";

  return (
    <Flex
      alignItems="center"
      borderBottom="2px solid"
      borderColor="blue.100"
      p="3"
      bg="blue.100"
    >
      <Avatar user={user} size="lg" />

      <Box ml="4">
        <UsernameButton user={user} />
        <Text fontSize="sm" color="gray.500">{formatDistanceToNow(date)} ago</Text>
      </Box>
    </Flex>
)}
