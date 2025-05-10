// CheckoutModal.js
import React, { useState } from 'react';
import { Box, Button, TextField, Grid, Modal, Typography, Paper } from '@mui/material';
import axios from "axios";
import Swal from 'sweetalert2';
import theme from './theme';
import { ThemeProvider } from "@mui/material/styles";
import scanner from "../Image/Scanner.png";
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './GlobalContext';
import { useEffect } from 'react';

const CheckoutModal = ({ open, onClose, }) => {
    const {host,setCartCount,carts,userDetails}=useContext(AuthContext)
let product=false;
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        zipCode: '',
        country: '',
        phone: '',
        email: ''
    });

       // Calculate subtotal and grand total
       const calculateSubtotal = () => {
        return carts?.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2);
    };

    const [proceedDetail, setProceedDetail] = useState([]);
    useEffect(() => {
        let items;
        let totalAmount;
        if (product) {
            items = {
                productId: product?._id,
                name: product?.name,
                price: product?.price,
                image: product?.image,
                quantity: 1,
                total: product?.price * 1
            };
            totalAmount = product?.price;
        } else {
            items = carts?.map(item => ({
                productId: item.product?._id,
                name: item.product?.name,
                price: item.product?.price,
                image: item.product?.image,
                quantity: item.quantity,
                total: item.product?.price * item.quantity
            }));
            totalAmount = calculateSubtotal();
        }
        setProceedDetail({ items, totalAmount });
    }, [product, carts]);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must be exactly 10 digits';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email is not valid';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    let navigate=useNavigate()

    const handleOrder = (transactionId) => {
        const Data = {
            products:product?[proceedDetail?.items]: proceedDetail?.items,
            user: userDetails?._id,
            formData: formData,
            totalamount:product? product?.totalAmount: proceedDetail?.totalAmount,
            transactionId: transactionId // Include transactionId here
        };


        axios.post(`${host}/api/order/insertorder`, Data)
            .then((res) => {
                if (res.data.status) {
                    navigate('/products');
                    setFormData({});
                    setCartCount((prev) => prev + 1);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const handlePayment = () => {
        if (validate()) {
            onClose()
            Swal.fire({
                title: 'Scan the QR Code',
                html: `
          <img src="${scanner}" alt="QR Code" style="width:50%; height:50%; display:block; margin:auto;">
          <input type="text" id="transactionId" class="swal2-input" placeholder="Enter Transaction ID">
        `,
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText: 'Proceed to QR Code',
                cancelButtonText: 'Cancel',
                preConfirm: () => {
                    const transactionId = Swal.getPopup().querySelector('#transactionId').value;
                    if (!transactionId) {
                        Swal.showValidationMessage('Transaction ID is required');
                        return false;
                    } else if (transactionId.length < 6) {
                        Swal.showValidationMessage('Transaction ID must be at least 6 characters long');
                        return false;
                    }
                    return transactionId;
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Payment Done', 'Your payment has been processed!', 'success');
                    handleOrder(result.value);
                    onClose(); // Close modal after successful payment
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('Cancelled', 'Try Next time', 'info');
                }
            });
        }
    };


 
    if (!open) return null;

    return (
        <>
            <ThemeProvider theme={theme}>
                <Modal open={open} onClose={onClose} aria-labelledby="checkout-modal-title">
                    <Paper elevation={3} sx={{
                        // width: { xs: '90%', sm: '70%', md: '50%' }, 
                        maxWidth: 600,
                        maxHeight: 600,
                        overflowY: 'auto',
                        margin: 'auto',
                        mt: 2,
                        p: 3,
                        backgroundColor: 'white'
                    }}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Checkout
                        </Typography>
                        <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                error={!!errors.address}
                                helperText={errors.address}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Zip Code"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleChange}
                                error={!!errors.zipCode}
                                helperText={errors.zipCode}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                error={!!errors.country}
                                helperText={errors.country}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                error={!!errors.phone}
                                helperText={errors.phone}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                margin="normal"
                            />
                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" onClick={handlePayment}>
                                    Proceed to Payment
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Modal>
            </ThemeProvider>
        </>
    );
};

export default CheckoutModal;
