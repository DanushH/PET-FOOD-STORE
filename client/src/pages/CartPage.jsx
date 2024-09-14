import {
    Box,
    Button,
    Container,
    Heading,
    HStack,
    Text,
    VStack,
    useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CartPage = ({ cartItems, total, removeFromCart }) => {
    return (
        <Container maxW={"container.lg"} py={8}>
            <Heading mb={6} textAlign={"center"}>
                Your Cart
            </Heading>

            {cartItems.length === 0 ? (
                <Text align={"center"}>
                    Your cart is empty.{" "}
                    <Link to="/" style={{ color: "blue", fontWeight: "bold" }}>
                        Browse Products
                    </Link>
                </Text>
            ) : (
                <VStack spacing={8}>
                    {cartItems.map((item, index) => (
                        <HStack
                            key={index}
                            borderWidth={1}
                            borderRadius="lg"
                            p={4}
                            justifyContent="space-between"
                            w="full"
                            bg={useColorModeValue("gray.100", "gray.700")}
                        >
                            <VStack align="start">
                                <Text fontWeight="bold">{item.name}</Text>
                                <Text>
                                    LKR {item.price} x {item.quantity}
                                </Text>
                                <Text fontWeight="bold">
                                    Total: LKR {item.price * item.quantity}
                                </Text>
                            </VStack>
                            <Button
                                colorScheme="red"
                                onClick={() => removeFromCart(index)}
                            >
                                Remove
                            </Button>
                        </HStack>
                    ))}
                    <Box textAlign="right" w="full">
                        <Text fontSize="xl" fontWeight="bold">
                            Total: LKR {total.toFixed(2)}
                        </Text>
                        <Button colorScheme="green" mt={4}>
                            Proceed to Checkout
                        </Button>
                    </Box>
                </VStack>
            )}
        </Container>
    );
};

export default CartPage;
