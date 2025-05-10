import React, { useContext, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  IconButton,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";
import { AuthContext } from "./GlobalContext";
import axios from "axios";
import theme from "./theme";
import Header from "./Header";
import Footer from "./Footer";
import { toast } from "react-toastify";
import CheckoutModal from "./CheckoutModal";

const Cart = () => {
  const { carts, setCartCount, imagePath, host, handleBuy } =
    useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const TAX_RATE = 0.1; // 10% tax rate

  const handleQuantityChange = async (item, qty, type) => {
    if (type === "remove") {
      try {
        let CartId = item._id;
        const response = await axios.delete(
          `${host}/api/cart/deletecart/${CartId}`
        );
        if (response.status === 200) {
          setCartCount((prev) => prev - 1);
          toast.success(response.data.message || "Item removed from cart.");
        }
      } catch (error) {
        console.error("Error deleting cart item:", error);
        toast.error("Error deleting item.");
      }
      return;
    }

    let newQuantity = type === "plus" ? qty + 1 : qty - 1;
    if (newQuantity < 1) return;

    try {
      let CartId = item._id;
      const response = await axios.put(
        `${host}/api/cart/updatecart/${CartId}`,
        { quantity: newQuantity }
      );
      if (response.status === 200) {
        setCartCount((prev) => prev + 1);
        toast.success(response.data.message || "Cart quantity updated.");
      }
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      toast.error("Error updating quantity.");
    }
  };

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOrder = (status, method, transactionId) => {
    // Your handleOrder logic
  };

  const calculateSubtotal = () => {
    return carts
      ?.reduce((acc, item) => acc + item?.product?.price * item?.quantity, 0)
      .toFixed(2);
  };

  const calculateGrandTotal = (subtotal) => {
    const numericSubtotal = parseFloat(subtotal);
    const grandTotal = (numericSubtotal * (1 + TAX_RATE)).toFixed(2);
    return grandTotal;
  };

  const subtotal = calculateSubtotal();
  const grandTotal = calculateGrandTotal(subtotal);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Box
        sx={{
          position: "relative",
          minHeight: "300px",
          backgroundImage: "url(/assets/images/hero-background.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          py: 10,
          mb: 6,
          "::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          },
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            color: "white",
            textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)",
            mb: 3,
            fontWeight: 700,
            fontSize: { xs: "2.5rem", md: "4rem" },
            zIndex: 3,
          }}
        >
          Your Cart
        </Typography>
      </Box>

      <Container sx={{ py: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Shopping Cart
        </Typography>
        {carts?.length > 0 ? (
          <>
            <List>
              {carts?.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                    bgcolor: "background.paper",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      src={`${imagePath}/${item?.product?.image}`}
                      alt={item.product.image}
                      sx={{ width: 120, height: 120 }}
                    />
                  </ListItemAvatar>
                  <Box sx={{ flex: 1, ml: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {item.product.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      Price: ₹{item.product.price.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <IconButton
                      onClick={() =>
                        handleQuantityChange(item, item.quantity, "minus")
                      }
                      disabled={item.quantity === 1}
                      sx={{ mx: 1 }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ mx: 2 }}>
                      {item.quantity}
                    </Typography>
                    <IconButton
                      onClick={() =>
                        handleQuantityChange(item, item.quantity, "plus")
                      }
                      sx={{ mx: 1 }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <IconButton
                    onClick={() =>
                      handleQuantityChange(item, item.quantity, "remove")
                    }
                    sx={{ color: "error.main", ml: 2 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 4 }} />
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                mb: 5,
                borderRadius: 3,
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Box mb={3}>
                <Typography variant="h6" fontWeight="bold">
                  Subtotal: ₹{subtotal}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Tax (10%): ₹{(subtotal * TAX_RATE).toFixed(2)}
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="h5" fontWeight="bold">
                Grand Total: ₹{grandTotal}
              </Typography>
            </Paper>
            <Button
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                padding: "12px",
                fontSize: "16px",
                borderRadius: "8px",
              }}
              onClick={handleCheckout}
              fullWidth
            >
              Proceed to Checkout
            </Button>
          </>
        ) : (
          <Typography variant="h6" color="textSecondary">
            There are no items in your cart.
          </Typography>
        )}
      </Container>

      <Footer />
      <CheckoutModal
        open={isModalOpen}
        onClose={handleCloseModal}
        handleOrder={handleOrder}
      />
    </ThemeProvider>
  );
};

export default Cart;
