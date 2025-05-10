import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  ThemeProvider,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import config from "../../../config";
import theme from "./theme";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${config.host}/api/users/Userlogin`,
        formData
      );
      console.log(response.data);
      // Save token to local storage
      localStorage.setItem("auth-token", response.data.token);
      // Redirect to home page
      navigate("/home");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              name="password"
              type={passwordVisible ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ position: "relative" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                Login
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
            <Box sx={{ mt: 2 }}>
              <Link href="/register" variant="body2">
                Don't have an account? Register here
              </Link>
            </Box>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
