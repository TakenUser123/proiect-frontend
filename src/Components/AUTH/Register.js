import {
    Center, 
    Box, 
    Heading, 
    Input, 
    FormControl, 
    FormLabel, 
    FormErrorMessage, 
    Button ,
    Link,
    Text
} from "@chakra-ui/react";
import { Link as RouterLink} from "react-router-dom";
import {DASHBOARD, LOGIN} from "../../lib/Routes";
import {useRegister} from "../../Hooks/Auth";
import {useForm} from "react-hook-form";
import { emailValidate, passwordValidate, usernameValidate } from "../../utils/form-validate";


export default function Register() {
    const { register: signup } = useRegister();
    const {
        register, 
        handleSubmit, 
        formState:{errors},
    } = useForm();


    async function handleRegister(data){
        signup({
            username: data.username,
            email: data.email, 
            password: data.password, 
            redirectTo:DASHBOARD
    });}

    return (
        <Center w="100%" h="100vh" textColor="white">
            <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius = "lg" backgroundColor="blue.200">
                <Heading mb="4" size = "lg" textAlign="center">Register</Heading>

                <form onSubmit={handleSubmit(handleRegister)}>
                    <FormControl isInvalid={errors.username} py="2">
                    <FormLabel>Username</FormLabel>
                    <Input placeholder="username" {...register("username", usernameValidate)}/>
                    <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                </FormControl>
              
                <FormControl isInvalid={errors.email} py="2">
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder="user@user.com" {...register("email", emailValidate)}/>
                    <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password} py="2">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" placeholder="*****" {...register("password", passwordValidate)}/>
                    <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                </FormControl>
                <Button
                    mt="4"
                    type="submit"
                    colorScheme="blue"
                    size="md"
                    w="full"
                    loadingText="Signing up..."
                >Register
                </Button>
            </form>
          
            <Text fontSize="xlg" align="center" mt="6">
                Already have an account?{" "}
                <Link 
                    as={RouterLink}
                    to={LOGIN} 
                    color="white.800" 
                    fontWeight="medium"
                    textDecor="underline"
                    _hover={{background:"blue.100"}}
                    mt="6"
                >Log In
                </Link>
            </Text>
        </Box>
    </Center>
)}
