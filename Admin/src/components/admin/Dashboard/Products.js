import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Add,
  Delete,
  Edit,
  CurrencyRupee,
} from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';

import axios from "axios";
import config from "../../../config"; // Import the config file
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

// Set up Axios instance with base URL from config
const api = axios.create({
  baseURL: config.host + "/api",
  timeout: 1000,
});

// Define the theme for Material-UI components
const theme = createTheme({
  palette: {
    primary: {
      main: "#FF5722", // deepOrange color
    },
    secondary: {
      main: "#FF5722", // deepOrange color
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          transition: "0.3s",
          display: 'flex',
          flexDirection: 'column',
          height: '100%', // Make sure cards take up full height of grid item
          overflow: 'hidden', // Hide overflow content
          "&:hover": {
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            transform: "scale(1.02)",
          },
        },
      },
    },
  },
});

// Dialog component for creating or editing products and merchandise
const ProductDialog = ({
  open,
  onClose,
  onSubmit,
  name,
  setName,
  price,
  setPrice,
  inventory,
  setInventory,
  description,
  setDescription,
  image,
  setImage,
  isEditMode,
}) => {
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setImagePreview("");
    }
  }, [image]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="create-product-dialog"
      aria-describedby="create-product-form"
      // maxWidth="md"
      fullWidth
    >
      <DialogTitle>{isEditMode ? "Edit Item" : "Add New Item"}</DialogTitle>
      <DialogContent
        dividers
        sx={{
          overflowY: 'auto',
          maxHeight: '60vh',
        }}
      >
        <form onSubmit={onSubmit}>
          <TextField
            fullWidth
            label="Item Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Price"
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Inventory"
            type="number"
            value={inventory}
            onChange={(event) => setInventory(event.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            margin="normal"
            required
          />
          {imagePreview && (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <img
                src={imagePreview}
                alt="Image Preview"
                style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }}
              />
            </Box>
          )}
          <Button variant="contained" component="label" sx={{ mt: 2 }} fullWidth>
            Upload Image
            <input
              type="file"
              hidden
              onChange={(event) => setImage(event.target.files[0])}
            />
          </Button>

        </form>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={onSubmit}
          disabled={!name || !description || !price || !inventory}
        >
          {isEditMode ? "Update Item" : "Save Item"}
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};


// Component for viewing item details
const ItemDetailsDialog = ({ open, onClose, selectedProduct }) => (
 <>
 <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
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
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
 </>
);


const ProductsAndMerchandise = () => {
  const [items, setItems] = useState([]);
  const [modals, setModals] = useState({ item: false,viewItem: false });
  const [itemForm, setItemForm] = useState({
    id: null,
    name: "",
    price: "",
    inventory: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/products");
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        toast.error("Failed to fetch data. Please check the server or CORS settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (itemId = null, data = null) => {
    setItemForm({
      id: data ? data._id : null,
      name: data ? data.name : "",
      price: data ? data.price : "",
      inventory: data ? data.inventory : "",
      description: data ? data.description : "",
      image: null,
    });
    setIsEditMode(!!data);
    setModals((prev) => ({ ...prev, item: true }));
  };

  const handleCloseModal = () => {
    setModals((prev) => ({ ...prev, item: false }));
  };

  const handleItemSubmit = async (event) => {
    event.preventDefault();
    if (!itemForm.image && !isEditMode) {
      toast.error("Image is required.");
      return;
    }
    const formData = new FormData();
    formData.append("name", itemForm.name);
    formData.append("price", itemForm.price);
    formData.append("inventory", itemForm.inventory);
    formData.append("description", itemForm.description);
    if (itemForm.image) {
      formData.append("image", itemForm.image);
    }
    try {
      if (isEditMode) {
        await api.put(`/products/${itemForm.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Item updated successfully");
      } else {
        await api.post("/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Item added successfully");
      }
      const { data } = await api.get("/products");
      setItems(data);
      handleCloseModal();
    } catch (error) {
      console.error("Error saving item:", error.message);
      toast.error("Failed to save item. Please check the server or the data you are sending.");
    }
  };

  const handleItemDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete this product',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#635bff',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await api.delete(`/products/${id}`);
            if (response?.data?.success) {
              setItems(items?.filter((item) => item._id !== id));
              toast.success(response?.data?.message);
            } else {
              toast.error(response?.data?.message);
            }
          } catch (error) {
            console.error('Error deleting member:', error);
          }
        }
      });
    } catch (error) {
      console.error("Error deleting item:", error.message);
      toast.error("Failed to delete item. Please check the server or the ID you are trying to delete.");
    }
  };

  const [viewItem, setViewItem] = useState(null);

  const handleItemView = (item) => {
    setViewItem(item);
    setModals((prev) => ({ ...prev, viewItem: true }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Typography
            variant="h4"
            style={{ fontWeight: "bold" }}
            align="center"
          >
            Manage Products and Merchandise
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => handleOpenModal()}
          >
            Add New Item
          </Button>
        </Box>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: '60vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>

            {items?.length === 0 && (
              <Typography variant="h5" color="textSecondary" textAlign="center" sx={{ pl: 3, my: 3 }}>
                No data available
              </Typography>
            )}
            {items.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" noWrap>{item.name}</Typography>
                    <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 900 }}>
                      <CurrencyRupee /> {item.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Inventory: {item.inventory}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                    {item.image && (
                      <Box sx={{ mt: 2, textAlign: "center" }}>
                        <img
                          src={`${config.host}/uploads/${item.image}`}
                          alt={item.name}
                          style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }}
                        />
                      </Box>
                    )}


                  </CardContent>
                  <CardActions>
                    <IconButton
                      onClick={() => handleOpenModal(item._id, item)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleItemDelete(item._id)}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton onClick={() => handleItemView(item)}>
                      <VisibilityIcon  sx={{color:'green'}}/>
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <ProductDialog
          open={modals.item}
          onClose={handleCloseModal}
          onSubmit={handleItemSubmit}
          name={itemForm.name}
          setName={(name) => setItemForm({ ...itemForm, name })}
          price={itemForm.price}
          setPrice={(price) => setItemForm({ ...itemForm, price })}
          inventory={itemForm.inventory}
          setInventory={(inventory) => setItemForm({ ...itemForm, inventory })}
          description={itemForm.description}
          setDescription={(description) => setItemForm({ ...itemForm, description })}
          image={itemForm.image}
          setImage={(image) => setItemForm({ ...itemForm, image })}
          isEditMode={isEditMode}
        />

<ItemDetailsDialog
          open={modals.viewItem}
          onClose={() => setModals((prev) => ({ ...prev, viewItem: false }))}
          selectedProduct={viewItem}
        />

      </Container>
    </ThemeProvider>
  );
};

export default ProductsAndMerchandise;
