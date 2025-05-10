import React, { useState, useContext, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField, Grid, Divider, Rating, Paper } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from './GlobalContext'; // Adjust the import path as needed

const Feedback = () => {
    const { feedback, setFeedback, setFeedbackCount, host, user } = useContext(AuthContext);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [form, setForm] = useState({ name: '', email: '', message: '', rating: 0 });  // Add rating to the form state
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) {
            setForm((prevForm) => ({
                ...prevForm,
                name: user.name,
                email: user.email,
            }));
        }
    }, [user]);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await axios.get(`${host}/api/feedback/getfeedback`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setFeedback(response.data.feedbacks);
            } catch (error) {
                console.error('Error fetching feedback:', error);
            }
        };

        fetchFeedback();
    }, [host, setFeedback]);

    const handleFeedbackClick = (feedback) => {
        setSelectedFeedback(feedback);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleRatingChange = (event, newValue) => {
        setForm((prevForm) => ({ ...prevForm, rating: newValue }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.name) newErrors.name = 'Name is required';
        if (!form.email) newErrors.email = 'Email is required';
        if (!form.message) newErrors.message = 'Message is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid';
        if (form.rating === 0) newErrors.rating = 'Rating is required';
        return newErrors;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post(`${host}/api/feedback/addfeedback`, {
                ...form,
                starRating: Number(form.rating) // Ensure starRating is sent as a number
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Include the token in the request headers
                }
            });

            console.log('Response:', response.data); // Log the response

            if (response.data.success) {
                toast.success(response.data.message);
                setForm({ name: user.name, email: user.email, message: '', rating: 0 });  // Reset form after submission
                setErrors({});
                setFeedbackCount((prevCount) => prevCount + 1);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleClose = () => setSelectedFeedback(null);

    return (
        <Box sx={{ mb: 15, mt: 8, position: 'relative', px: 0, paddingX: 5 }}>
            <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main' }}>
                Reviews
            </Typography>
            {feedback.length === 0 && (
                <Box sx={{ paddingX: 5, mb: 5 }}>
                    <Typography variant="h6" align="center" color="textSecondary">
                        No Feedback Available
                    </Typography>
                </Box>
            )}
            {feedback.length > 0 && (
                <Grid container spacing={2} justifyContent="center">
                    {feedback.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                elevation={3}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    borderRadius: '12px',
                                    backgroundColor: '#f9f9f9',
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                                    },
                                    cursor: 'pointer',
                                    mx: 2,
                                    mb: 2,
                                }}
                                onClick={() => handleFeedbackClick(item)}
                            >
                                <CardContent sx={{ textAlign: 'left' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Name: {item.name}</Typography>
                                    <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>Feedback: {item.message}</Typography>
                                    <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>Rating:</Typography>
                                    <Rating value={item.starRating} readOnly /> {/* Display star rating */}
                                    {item?.response && (
                                        <>
                                            <Divider sx={{ mt: 2 }} />
                                            <Typography variant="body2" sx={{ color: 'text.primary', mt: 1 }}>
                                                Response: {item.response}
                                            </Typography>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <Divider sx={{ mt: 5 }} />
            <Box sx={{ my: 2, px: 2 }}>
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
                        Your Feedback Matters to Us
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        We value your opinion! Please share your feedback through the form below to help us enhance our services and provide a better travel experience. Your insights are crucial in guiding our improvements.
                    </Typography>
                </Box>
            </Box>

            {/* Feedback form */}
            <Paper
                component="form"
                onSubmit={handleFormSubmit} // Attach the form submit handler
                sx={{
                    mt: 4,
                    mx: 'auto',
                    maxWidth: 500,
                    padding: 3,
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#fff',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            name="name"
                            value={form.name}
                            onChange={handleFormChange}
                            fullWidth
                            margin="normal"
                            error={!!errors.name}
                            helperText={errors.name}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            name="email"
                            value={form.email}
                            onChange={handleFormChange}
                            fullWidth
                            margin="normal"
                            error={!!errors.email}
                            helperText={errors.email}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Message"
                            name="message"
                            value={form.message}
                            onChange={handleFormChange}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            error={!!errors.message}
                            helperText={errors.message}
                            variant="outlined"
                        />
                    </Grid>

                    {/* Add Rating Input */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                            Please rate your experience:
                        </Typography>
                        <Rating
                            value={form.rating}
                            onChange={handleRatingChange}
                            name="rating"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type="submit" // Ensure the button is of type submit
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default Feedback;