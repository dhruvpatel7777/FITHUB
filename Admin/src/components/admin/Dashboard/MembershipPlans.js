import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  InputAdornment,
  Card,
  CardContent,
  CardActions,
  Grid,
  Divider,
  Avatar,
  FormHelperText,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Search as SearchIcon,
  Remove as RemoveIcon,
  FitnessCenter as FitnessCenterIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  CheckCircle as CheckCircleIcon,
  WorkspacePremium as WorkspacePremiumIcon,
  MilitaryTech as MilitaryTechIcon,
  CalendarToday as CalendarTodayIcon,
  ListAlt as ListAltIcon,
} from "@mui/icons-material";
import { deepOrange, red, green, blue } from "@mui/material/colors";
import config from "../../../config";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const validityPeriods = [
  { value: "1_month", label: "1 Month" },
  { value: "3_months", label: "3 Months" },
  { value: "6_months", label: "6 Months" },
  { value: "1_year", label: "1 Year" },
];

const planIcons = {
  "Basic Plan": <FitnessCenterIcon />,
  "Premium Plan": <WorkspacePremiumIcon />,
  "VIP Plan": <MilitaryTechIcon />,
};

const MembershipPlans = () => {
  const [plans, setPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
    benefits: [""],
    validity: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    benefits: "",
    validity: "",
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${config.host}/api/plans/getPlans`);
      setPlans(response.data);
    } catch (error) {
      console.error("Failed to fetch plans", error);
    }
  };

  const handleOpen = (plan = null) => {
    setSelectedPlan(plan);
    setFormValues(
      plan
        ? {
            name: plan.name,
            price: plan.price,
            benefits: plan.benefits,
            validity: plan.validity,
          }
        : { name: "", price: "", benefits: [""], validity: "" }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPlan(null);
  };


  const validateForm = () => {
    const newErrors = {
      name: "",
      price: "",
      benefits: "",
      validity: "",
    };
  
    if (!formValues.name) newErrors.name = "Plan name is required";
    if (!formValues.price) newErrors.price = "Price is required";
    if (!formValues.validity) newErrors.validity = "Validity period is required";
    
    const hasValidBenefit = formValues.benefits.some((benefit) => benefit.trim());
    if (!hasValidBenefit) newErrors.benefits = "At least one benefit is required";
  
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };
  

  const handleSave = async () => {
    if (!validateForm()) return;
    try {
      if (selectedPlan) {
        // Update plan logic
        const response = await axios.put(
          `${config.host}/api/plans/updatePlan/${selectedPlan._id}`,
          formValues
        );
  
        if (response.data.success) {
          toast.success(response.data.message);
          setPlans(
            plans.map((plan) =>
              plan._id === selectedPlan._id
                ? { ...formValues, _id: selectedPlan._id }
                : plan
            )
          );
        } else {
          toast.error('Error updating plan: ' + response.data.message);
        }
      } else {
        // Add plan logic
        const response = await axios.post(`${config.host}/api/plans/addPlan`, formValues);
  
        if (response.data.success) {
          toast.success(response.data.message);
          setPlans([...plans, { _id: Date.now().toString(), ...formValues }]);
        } else {
          toast.error(response.data.message);
        }
      }
      handleClose();
  
    } catch (error) {
      console.error("Failed to save the plan", error);
      toast.error("Failed to save the plan. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this plan',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#635bff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${config.host}/api/plans/deletePlan/${id}`);
          if (response?.data?.success) {
          setPlans(plans.filter((plan) => plan._id !== id));
            toast.success(response?.data?.message);
          } else {
            toast.error(response?.data?.message);
          }
        } catch (error) {
          console.error('Error deleting member:', error);
        }
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleBenefitChange = (index, value) => {
    const newBenefits = [...formValues.benefits];
    newBenefits[index] = value;
    setFormValues({ ...formValues, benefits: newBenefits });
  };

  const addBenefit = () => {
    setFormValues({ ...formValues, benefits: [...formValues.benefits, ""] });
  };

  const removeBenefit = (index) => {
    const newBenefits = [...formValues.benefits];
    newBenefits.splice(index, 1);
    setFormValues({ ...formValues, benefits: newBenefits });
  };

  const filteredPlans = plans.filter((plan) =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Manage Membership Plans
      </Typography>
      <TextField
        placeholder="Search by name"
        variant="outlined"
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Box display="flex" justifyContent="center" mb={2}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          sx={{
            bgcolor: deepOrange[500],
            "&:hover": { bgcolor: deepOrange[700] },
          }}
        >
          Add Plan
        </Button>
      </Box>
      <Grid container spacing={3}>

      {filteredPlans.length === 0 &&(
        <Typography variant="h5" color="textSecondary" textAlign="center" sx={{pl:3}}>
          No data available
        </Typography>
      )}
        {filteredPlans.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan._id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 8,
                boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb={2}
                >
                  <Avatar sx={{ bgcolor: deepOrange[500], mr: 2 }}>
                    {planIcons[plan.name] || <FitnessCenterIcon />}
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    {plan.name}
                  </Typography>
                </Box>
                <Divider />
                <Box display="flex" alignItems="center" mt={2}>
                  <CurrencyRupeeIcon sx={{ color: green[500], mr: 1 }} />
                  <Typography variant="body1" gutterBottom>
                    ₹{plan.price}
                  </Typography>
                </Box>
                <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
                  Benefits:
                </Typography>
                <ul style={{ paddingLeft: "1.2em" }}>
                  {plan.benefits.map((benefit, index) => (
                    <li key={index} style={{ listStyleType: "none" }}>
                      <CheckCircleIcon
                        fontSize="small"
                        sx={{ color: green[500], mr: 1 }}
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography variant="body2">
                    Validity:{" "}
                    {validityPeriods.find((vp) => vp.value === plan.validity)
                      ?.label || plan.validity}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", mt: "auto" }}>
                <IconButton
                  color="primary"
                  onClick={() => handleOpen(plan)}
                  sx={{ color: blue[500] }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(plan._id)}
                  sx={{ color: red[500] }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          {selectedPlan ? (
            <>
              <EditIcon sx={{ mr: 1 }} />
              Edit Plan
            </>
          ) : (
            <>
              <AddIcon sx={{ mr: 1 }} />
              Add New Plan
            </>
          )}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Plan Name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FitnessCenterIcon />
                </InputAdornment>
              ),
            }}
            error={!!errors.name}
              helperText={errors.name}
          />
          <TextField
            label="Price"
            name="price"
            value={formValues.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupeeIcon />
                </InputAdornment>
              ),
            }}
            error={!!errors.price}
              helperText={errors.price}
          />
          <TextField
            label="Validity Period"
            name="validity"
            value={formValues.validity}
            onChange={handleChange}
            select
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon />
                </InputAdornment>
              ),
            }}
            error={!!errors.validity}

          >
            {validityPeriods.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <FormHelperText>{errors.validity}</FormHelperText>

          <Typography variant="body2" sx={{ mb: 1 }}>
            Benefits:
          </Typography>
          {formValues.benefits.map((benefit, index) => (
            <Box display="flex" alignItems="center" key={index}>
              <TextField
                label={`Benefit ${index + 1}`}
                value={benefit}
                onChange={(e) => handleBenefitChange(index, e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ListAltIcon />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.benefits}

              />
              <IconButton
                color="error"
                onClick={() => removeBenefit(index)}
                sx={{ ml: 1 }}
              >
                <RemoveIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            onClick={addBenefit}
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{ mt: 1 }}
          >
            Add Benefit
          </Button>
          <FormHelperText sx={{color:'red'}}>{errors.benefits}</FormHelperText>

        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            startIcon={<CancelIcon />}
            color="error"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MembershipPlans;
