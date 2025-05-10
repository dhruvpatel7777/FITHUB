import React, { useEffect, useState, useMemo } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Dialog,
  Pagination,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Header from "./Header";
import Footer from "./Footer";
import config from "../../../config";
import { useContext } from "react";
import { AuthContext } from "./GlobalContext";
import axios from 'axios'
import { toast } from "react-toastify";


const ProductCard = ({ product, handleOpenModal,handleAddToCart }) => (
  <Card
    sx={{
      height: "100%",
      borderRadius: 3,
      boxShadow: 6,
      overflow: "hidden",
      transition: "transform 0.3s, box-shadow 0.3s",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: 12,
      },
    }}
  >
    {product.image && (
      <Box sx={{ height: 320, width: "100%", overflow: "hidden" }}>
        <img
          src={`${config.host}/uploads/${product.image}`}
          alt={product.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderBottom: "1px solid #ddd",
          }}
        />
      </Box>
    )}
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        p: 3,
      }}
    >
      <Typography variant="h5" component="div" sx={{ mb: 1 }}>
        {product.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {product.description}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Inventory: {product.inventory}
      </Typography>
      <Typography variant="body1" color="text.primary" sx={{ fontWeight: 600 }}>
        ₹{product.price}
      </Typography>
    </CardContent>
    <CardActions
      sx={{
        justifyContent: "space-between",
        p: 2,
        borderTop: "1px solid #ddd",
      }}
    >
      <Button
        size="small"
        color="primary"
        variant="contained"
        // onClick={() => addToCart({ ...product, quantity: 1 })}
        onClick={()=>handleAddToCart(product)}
        onCli
        sx={{
          borderRadius: 3,
          padding: "10px 20px",
          textTransform: "uppercase",
        }}
      >
        Add to Cart
      </Button>
      <Button
        size="small"
        variant="outlined"
        onClick={() => handleOpenModal(product)}
        sx={{ borderRadius: 3 }}
      >
        Details
      </Button>
    </CardActions>
  </Card>
);

const ProductDetailsModal = ({
  openModal,
  handleCloseModal,
  selectedProduct,
}) => (
  <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
    <DialogTitle>Product Details</DialogTitle>
    <DialogContent>
      {selectedProduct && (
        <Box>
          <Typography variant="h6" component="div" sx={{ mb: 1 }}>
            {selectedProduct.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {selectedProduct.description}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Inventory: {selectedProduct.inventory}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            ₹{selectedProduct.price}
          </Typography>
          {selectedProduct.image && (
            <img
              src={`${config.host}/uploads/${selectedProduct.image}`}
              alt={selectedProduct.title}
              style={{ width: "100%", marginTop: "10px" }}
            />
          )}
        </Box>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseModal}>Close</Button>
    </DialogActions>
  </Dialog>
);

const ProductSection = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const productsPerPage = 6;
  const {host,setCartCount,userDetails,}=useContext(AuthContext)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${config.host}/api/products`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const currentProducts = useMemo(() => {
    return products.slice((page - 1) * productsPerPage, page * productsPerPage);
  }, [products, page, productsPerPage]);


  const handleAddToCart = async (productItem) => {
    try {

      
  if (Object.keys(userDetails).length === 0) {
    toast.error("You are not allowed to add to cart to this website and will be rejected. Please login first.");
    return;
  }
      const productId = productItem?._id;
      const userId = userDetails?._id;
      if (!productId) {
        console.error("Product ID or Category ID is missing");
        return;
      }

      // Prepare the data to be sent in the request
      const cartData = {
        product: productId,
        user: userId,
      };
      const response = await axios.post(`${host}/api/cart/addtocart`, cartData,);
      if (response.data.success) {
        let message = response.data.message;
        // setMessage({ type: 'success', message: message });
        toast.success('Cart added successfully')
        setCartCount((prev) => prev + 1);

      } else {
        let errorMessage = response.data.message;
        // setMessage({ type: 'error', message: errorMessage });
        toast.error("Error when adding product to cart..")
      }
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
    }
  };

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
          py: 8,
          mb: 4,
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
            mb: 2,
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "3rem" },
            zIndex: 3,
          }}
        >
          Products and Merchandise
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
            mb: 4,
            fontSize: { xs: "1rem", md: "1.25rem" },
            zIndex: 3,
          }}
        >
          Discover our wide range of products and exclusive merchandise crafted
          just for you.
        </Typography>
      </Box>
      <Container id="products-section" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Our Products
        </Typography>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="200px"
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="body1" align="center" color="error">
            {error}
          </Typography>
        ) : currentProducts.length > 0 ? (
          <>
            <Grid container spacing={4}>
              {currentProducts.map((product) => (
                <Grid item xs={12} md={4} key={product._id}>
                  <ProductCard
                    product={product}
                    handleOpenModal={handleOpenModal}
                    handleAddToCart={handleAddToCart}
                  />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                count={Math.ceil(products.length / productsPerPage)}
                page={page}
                onChange={handlePageChange}
              />
            </Box>
          </>
        ) : (
          <Typography variant="body1" align="center" color="text.secondary">
            No products available at the moment.
          </Typography>
        )}
        <ProductDetailsModal
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          selectedProduct={selectedProduct}
        />
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default ProductSection;
