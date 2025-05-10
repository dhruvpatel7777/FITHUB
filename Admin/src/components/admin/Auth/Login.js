import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  InputAdornment,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import EmailIcon from "@mui/icons-material/Email";
import Lock from "@mui/icons-material/Lock";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../../config";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await axios.post(`${config.host}/api/admin/login`, formData);
      const { success, message, token } = response.data;
      if (success) {
        toast.success(message);
        localStorage.setItem("auth-token", token);
        navigate("/");
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage:
          "url(https://t4.ftcdn.net/jpg/03/17/72/47/360_F_317724775_qHtWjnT8YbRdFNIuq5PWsSYypRhOmalS.jpg)", // Add your background image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          borderRadius: 2,
          boxShadow: 4,
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, color: deepOrange[500] }}>
          Admin Login
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            margin="normal"
            fullWidth
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        
         <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: 2,
                backgroundColor: deepOrange[500],
                "&:hover": {
                  backgroundColor: deepOrange[600],
                },
              }}
            >
              Login
            </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
