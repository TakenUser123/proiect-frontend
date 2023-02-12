import { Button, Flex, Link } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { useLogout } from "../../Hooks/Auth"
import { DASHBOARD } from "../../lib/Routes"

export default function Navbar() {
  const {logout, isLoading} = useLogout();
  
  return (
    <Flex
      shadow="sm"
      pos="fixed"
      width="full"
      borderTop="6px solid"
      borderTopColor="blue.400"
      height="16"
      zIndex="3"
      justify="center"
      bg="blue.400"
    >
      <Flex px="4" w="full" align="center" maxW="1200px">
        <Link color="white" as={RouterLink} to={DASHBOARD} fontWeight="bold" >Home</Link>
        <Button
          ml="auto"
          colorScheme="blue"
          size="sm"
          onClick={logout}
          isLoading={isLoading}
        >Logout
        </Button>
      </Flex>
    </Flex>
)}
