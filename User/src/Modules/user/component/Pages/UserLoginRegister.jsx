import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  CircularProgress,
  Link,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Lock";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../../../config";

const UserLoginRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("UserLoginRegister component mounted");
    return () => {
      console.log("UserLoginRegister component unmounted");
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin && !formData.name) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const endpoint = isLogin ? "Userlogin" : "Userregister";
      const { data } = await axios.post(
        `${config.host}/api/users/${endpoint}`,
        formData
      );
      const { success, message, token } = data;

      if (success) {
        toast.success(message);
        if (isLogin) {
          localStorage.setItem("auth-token", token);
          navigate("/");
        } else {
          resetForm();
          setIsLogin(true);
        }
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${config.host}/api/users/reset-password`,
        { email: formData.email, newPassword: formData.newPassword }
      );
      toast.success(data.message);
      resetForm();
      setShowForgotPassword(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Password reset failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    });
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
          "url(https://img.freepik.com/free-vector/gradient-geometric-shapes-dark-background_23-2148446132.jpg)",
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
        <Typography variant="h4" sx={{ mb: 2, color: deepOrange[700] }}>
          {showForgotPassword
            ? "Reset Password"
            : isLogin
            ? "User Login"
            : "User Register"}
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <form
          onSubmit={showForgotPassword ? handlePasswordReset : handleSubmit}
        >
          {showForgotPassword ? (
            <>
              <CustomTextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <CustomTextField
                label="New Password"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
              />
              <CustomTextField
                label="Confirm New Password"
                name="confirmNewPassword"
                type="password"
                value={formData.confirmNewPassword}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              {!isLogin && (
                <CustomTextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />
              )}
              <CustomTextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <CustomTextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              {!isLogin && (
                <FormControlLabel
                  control={<Checkbox required color="primary" />}
                  label="Agree to terms and conditions"
                  sx={{ alignSelf: "flex-start", mt: 1, mb: 2 }}
                />
              )}
            </>
          )}
          {loading ? (
            <CircularProgress sx={{ mt: 2 }} />
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: 2,
                backgroundColor: deepOrange[700],
                "&:hover": {
                  backgroundColor: deepOrange[800],
                },
              }}
            >
              {showForgotPassword
                ? "Reset Password"
                : isLogin
                ? "Login"
                : "Register"}
            </Button>
          )}
        </form>
        <AuthToggleLinks
          showForgotPassword={showForgotPassword}
          isLogin={isLogin}
          toggleForgotPassword={() =>
            setShowForgotPassword(!showForgotPassword)
          }
          toggleLoginRegister={() => setIsLogin(!isLogin)}
        />
        {message && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

const CustomTextField = ({ label, name, type, value, onChange, error }) => (
  <TextField
    label={label}
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    fullWidth
    margin="normal"
    required
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          {name === "email" ? <AccountCircle /> : <Lock />}
        </InputAdornment>
      ),
    }}
    error={!!error}
    helperText={error}
    sx={{
      "& .MuiOutlinedInput-root": {
        borderRadius: 2,
      },
    }}
  />
);

const AuthToggleLinks = ({
  showForgotPassword,
  isLogin,
  toggleForgotPassword,
  toggleLoginRegister,
}) => (
  <>
    <Link
      href="#"
      variant="body2"
      sx={{ display: "block", mt: 2, cursor: "pointer" }}
      onClick={toggleForgotPassword}
    >
      {showForgotPassword ? "Back to Login/Register" : "Forgot Password?"}
    </Link>
    {!showForgotPassword && (
      <Link
        href="#"
        variant="body2"
        sx={{ display: "block", mt: 1, cursor: "pointer" }}
        onClick={toggleLoginRegister}
      >
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </Link>
    )}
  </>
);

export default UserLoginRegister;
