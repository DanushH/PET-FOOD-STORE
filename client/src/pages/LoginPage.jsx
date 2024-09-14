import { useState } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    Stack,
    Link,
    Heading,
} from "@chakra-ui/react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);

    const handleLogin = () => {
        // Implement login logic
        console.log("Logging in with", { email, password });
    };

    const handleSignUp = () => {
        // Implement sign-up logic
        console.log("Signing up with", { email, password });
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <Box
            maxW="md"
            mx="auto"
            mt="8"
            p="6"
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="lg"
        >
            <Heading mb="6" textAlign="center">
                {isSignUp ? "Sign Up" : "Login"}
            </Heading>

            <FormControl id="email" mb="4">
                <FormLabel>Email address</FormLabel>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />
            </FormControl>

            <FormControl id="password" mb="4">
                <FormLabel>Password</FormLabel>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                />
            </FormControl>

            <Button
                colorScheme="blue"
                width="100%"
                mb="4"
                onClick={isSignUp ? handleSignUp : handleLogin}
            >
                {isSignUp ? "Sign Up" : "Login"}
            </Button>

            <Stack direction="row" justifyContent="center" alignItems="center">
                <Text>
                    {isSignUp
                        ? "Already have an account?"
                        : "Don't have an account?"}
                </Text>
                <Link color="blue.500" onClick={toggleMode}>
                    {isSignUp ? "Login" : "Sign Up"}
                </Link>
            </Stack>
        </Box>
    );
};

export default LoginPage;
