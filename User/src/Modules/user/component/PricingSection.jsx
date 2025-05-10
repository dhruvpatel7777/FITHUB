import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  CardHeader,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { CheckCircleOutline } from "@mui/icons-material";
import theme from "./theme";
import config from "../../../config";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { toast } from "react-toastify";
import { AuthContext } from "./GlobalContext";
import Swal from "sweetalert2";
import scanner from "../Image/Scanner.png";
import { useNavigate } from 'react-router-dom';

const JoinNowModal = ({ open, handleClose, selectedPlan, userDetails,host, }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    country: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = { name: "", email: "", phone: "", age: "", address: "",country:"" };

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (!/^\d+$/.test(formData.age)) {
      newErrors.age = "Age must be a number";
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
    }
    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };




  const handleOrder = (transactionId) => {

    const data = {
      ...formData,
      userId: userDetails._id,
      subscription: selectedPlan,
      status:"Online"
    };

    axios.post(`${config.host}/api/members/add`, data)
      .then((response) => {
        const { success, message } = response.data;
        if (success) {
          toast.success(message);
          handleClose(); // Close the modal on success
          setFormData({
            name: "",
            email: "",
            phone: "",
            age: "",
            address: "",
          });
        } else {
          console.error("Error:", message);
          toast.error(message);
        }
      })
      .catch((error) => {
        console.error("Error saving plan:", error);
        toast.error("Failed to save the plan. Please try again.");
      });

      const data2= {
        ...formData,
        user: userDetails._id,
        plan: selectedPlan,
        transactionId:transactionId
      };
      console.log(data2,'data2');
      
    axios.post(`${host}/api/order/planinsertorder`, data2)
        .then((res) => {
            if (res.data.status) {
                setFormData({});
            }
        })
        .catch((err) => {
            console.log(err);
        });
};


const handlePayment = () => {
        handleClose()
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
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Try Next time', 'info');
            }
        });
    
};

const handleSubmit = () => {
  if (!validateForm()) return; // If validation fails, do not proceed

  if (Object.keys(userDetails).length === 0) {
    toast.error("You are not allowed to submit your form to this website and will be rejected. Please login first.");
    return;
  }

  console.log(formData, 'formData');
  handlePayment() // Uncomment this to proceed with payment if necessary
};

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Join {selectedPlan?.name}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense" error={Boolean(errors.name)}>
          <TextField
            id="name"
            name="name"
            label="Name"
            type="text"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            aria-describedby="name-error"
          />
          <FormHelperText id="name-error">{errors.name}</FormHelperText>
        </FormControl>
        <FormControl fullWidth margin="dense" error={Boolean(errors.email)}>
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            aria-describedby="email-error"
          />
          <FormHelperText id="email-error">{errors.email}</FormHelperText>
        </FormControl>
        <FormControl fullWidth margin="dense" error={Boolean(errors.phone)}>
          <TextField
            id="phone"
            name="phone"
            label="Phone"
            type="text"
            variant="outlined"
            value={formData.phone}
            onChange={handleChange}
            aria-describedby="phone-error"
          />
          <FormHelperText id="phone-error">{errors.phone}</FormHelperText>
        </FormControl>
        <FormControl fullWidth margin="dense" error={Boolean(errors.age)}>
          <TextField
            id="age"
            name="age"
            label="Age"
            type="number"
            variant="outlined"
            value={formData.age}
            onChange={handleChange}
            aria-describedby="age-error"
          />
          <FormHelperText id="age-error">{errors.age}</FormHelperText>
        </FormControl>
        <FormControl fullWidth margin="dense" error={Boolean(errors.address)}>
          <TextField
            id="address"
            name="address"
            label="Address"
            type="text"
            variant="outlined"
            value={formData.address}
            onChange={handleChange}
            aria-describedby="address-error"
          />
          <FormHelperText id="address-error">{errors.address}</FormHelperText>
        </FormControl>
        <FormControl fullWidth margin="dense" error={Boolean(errors.country)}>
          <TextField
            id="country"
            name="country"
            label="Country"
            type="text"
            variant="outlined"
            value={formData.country}
            onChange={handleChange}
            aria-describedby="country-error"
          />
          <FormHelperText id="country-error">{errors.country}</FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// PlanCard Component
const PlanCard = ({ plan, onJoinNow }) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      transition: "transform 0.3s, box-shadow 0.3s",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0 12px 24px rgba(0,0,0,0.3)",
      },
      borderRadius: 2,
      bgcolor: "background.paper",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    }}
  >
    <CardHeader
      avatar={
        <Avatar
          sx={{
            bgcolor: theme.palette.primary.main,
          }}
        >
          <CheckCircleOutline />
        </Avatar>
      }
      title={
        <Typography variant="h5" component="div" gutterBottom>
          {plan.name}
        </Typography>
      }
    />
    <CardContent
      sx={{
        flex: 1,
      }}
    >
      <Typography variant="h6" color="text.primary" gutterBottom>
        ₹{plan.price}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Validity: {plan.validity}
      </Typography>
      <List>
        {Array.isArray(plan.benefits) &&
          plan.benefits.map((benefit, idx) => (
            <ListItem key={idx}>
              <ListItemIcon>
                <CheckCircleOutline color="primary" />
              </ListItemIcon>
              <ListItemText primary={benefit} />
            </ListItem>
          ))}
      </List>
    </CardContent>
    <Box sx={{ p: 2, pt: 0 }}>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => onJoinNow(plan)}
      >
        Join Now
      </Button>
    </Box>
  </Card>
);

const PricingSection = () => {
  const { userDetails,host, } = useContext(AuthContext);

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  let navigate=useNavigate()

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`${config.host}/api/plans/getPlans`);
        setPlans(response.data);
      } catch (error) {
        setError("Failed to fetch plans");
        console.error("Failed to fetch plans", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleJoinNow = (plan) => {
    setSelectedPlan(plan);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPlan(null);
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
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container>
          <Typography
            variant="h3"
            component="h1"
            align="center"
            sx={{
              color: "white",
              textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
              mb: 4,
            }}
          >
            Choose Your Membership Plan
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 8 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="h6" color="error" align="center">
            {error}
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {plans.map((plan) => (
              <Grid item key={plan._id} xs={12} sm={6} md={4}>
                <PlanCard plan={plan} onJoinNow={handleJoinNow} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <Footer />

      {/* Join Now Modal */}
      {selectedPlan && (
        <JoinNowModal
          open={openModal}
          handleClose={handleCloseModal}
          selectedPlan={selectedPlan}
          userDetails={userDetails}
          host={host}
        />
      )}
    </ThemeProvider>
  );
};

export default PricingSection;
