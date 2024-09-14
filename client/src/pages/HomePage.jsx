import {
    Box,
    Grid,
    GridItem,
    Image,
    Text,
    Button,
    Alert,
    AlertIcon,
    AlertTitle,
    useDisclosure,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    HStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const HomePage = ({ addToCart }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [alertContent, setAlertContent] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [products, setProducts] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch products from the server
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5002/api/products"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                // console.log(response);
                const data = await response.json();
                console.log(data);
                setProducts(data.data); // Assuming the response has products in `data`
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError(error.message);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (productName, price) => {
        addToCart(productName, price, quantity);
        setAlertContent(
            `Added ${quantity} ${productName}(s) to cart for LKR ${
                price * quantity
            }`
        );
        onOpen();
        setTimeout(() => {
            onClose();
        }, 1000);
    };

    if (loading) {
        return <Box>Loading...</Box>; // Display loading message while fetching data
    }

    if (error) {
        return <Box>Error: {error}</Box>; // Display error message if any
    }

    return (
        <Box maxW={{ base: "100%", md: "1200px" }} mx="auto" my="4" p="4">
            <Grid
                templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                }}
                gap="6"
            >
                {products.map((product) => (
                    <GridItem key={product._id}>
                        <Box
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                        >
                            <Image
                                boxSize={{ base: "150px", md: "200px" }}
                                src={product.img}
                                alt={product.name}
                                borderRadius="inherit"
                                opacity={0.8}
                            />
                            <Box p="4">
                                <Text
                                    fontSize="xl"
                                    fontWeight="semibold"
                                    mb="2"
                                >
                                    {product.name}
                                </Text>
                                <Text fontSize="l" fontWeight="semibold" mb="2">
                                    LKR {product.price}
                                </Text>
                                <Text mb="4">{product.desc}</Text>
                                <Text mb="2">Available Qty: {product.qty}</Text>
                                <HStack spacing="4">
                                    <NumberInput
                                        defaultValue={1}
                                        min={1}
                                        max={10}
                                        onChange={(value) =>
                                            setQuantity(Number(value))
                                        }
                                        w="100px"
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <Button
                                        colorScheme="blue"
                                        onClick={() =>
                                            handleAddToCart(
                                                product.name,
                                                product.price
                                            )
                                        }
                                        w="150px"
                                    >
                                        Add to Cart
                                    </Button>
                                </HStack>
                            </Box>
                        </Box>
                    </GridItem>
                ))}
            </Grid>
            {isOpen && (
                <Alert
                    status="success"
                    variant="solid"
                    position="fixed"
                    bottom="4"
                    right="4"
                    width={{ base: "90%", md: "auto" }}
                >
                    <AlertIcon />
                    <Box>
                        <AlertTitle>{alertContent}</AlertTitle>
                    </Box>
                </Alert>
            )}
        </Box>
    );
};

export default HomePage;
