import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    const addToCart = (name, price, quantity) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(
                (item) => item.name === name
            );
            if (existingItemIndex !== -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += quantity;
                return updatedItems;
            }
            return [...prevItems, { name, price, quantity }];
        });
        setTotal((prevTotal) => prevTotal + price * quantity);
    };

    const removeFromCart = (index) => {
        const updatedItems = [...cartItems];
        const removedItem = updatedItems.splice(index, 1)[0];
        setCartItems(updatedItems);
        setTotal(
            (prevTotal) => prevTotal - removedItem.price * removedItem.quantity
        );
    };

    return (
        <Box minH={"100vh"}>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage addToCart={addToCart} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/cart"
                    element={
                        <CartPage
                            cartItems={cartItems}
                            total={total}
                            removeFromCart={removeFromCart}
                        />
                    }
                />
            </Routes>
        </Box>
    );
}

export default App;
