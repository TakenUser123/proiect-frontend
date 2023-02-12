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
import { Link as RouterLink } from "react-router-dom";
import {DASHBOARD, REGISTER} from "../../lib/Routes";
import {useLogin} from "../../Hooks/Auth";
import {useForm} from "react-hook-form";
import { emailValidate, passwordValidate } from "../../utils/form-validate";


export default function Login() {
    const { login } = useLogin();
    const {
        register, 
        handleSubmit, 
        reset, 
        formState:{errors},
    } = useForm();

    async function handleLogin(data){
        const succeeded = await login({
            email: data.email, 
            password: data.password, 
            redirectTo:DASHBOARD
        });
        if(succeeded) {
            reset();    
    }}

    return (
        <Center w="100%" h="100vh" textColor="white">
            <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius = "lg" backgroundColor="blue.200">
                <Heading mb="4" size = "lg" textAlign="center">Log in</Heading>

                <form onSubmit={handleSubmit(handleLogin)}>
                    <FormControl isInvalid={errors.email && errors.email.message} py="2">
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder="user@email.com" {...register("email", emailValidate)}/>
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.email && errors.password.message} py="2">
                        <FormLabel>Password</FormLabel>
                        <Input type="password" placeholder="*****" {...register("password", passwordValidate)}/>
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                    <Button
                        mt="4"
                        type="submit"
                        colorScheme="blue"
                        size="md"
                        w="full"
                        loadingText="Logging In..."
                    >Log In
                    </Button>
                </form>
            
                <Text fontSize="xlg" align="center" mt="6">
                    Don't have an account?{" "}
                    <Link 
                        as={RouterLink}     
                        to={REGISTER} 
                        color="white.800" 
                        fontWeight="medium"
                        textDecor="underline"
                        _hover={{background:"blue.100"}}
                        mt="6"
                    >Register
                    </Link>
                </Text>
            </Box>
        </Center>
)}
