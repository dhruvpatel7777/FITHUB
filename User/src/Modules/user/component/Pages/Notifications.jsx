import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import axios from "axios";

const Notifications = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("Update");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [response, setResponse] = useState({ status: "", message: "" });

  useEffect(() => {
    // Fetch users when the component mounts
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSendNotification = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post("/api/notifications", {
        title,
        message,
        type,
        userId: selectedUser, // Include the selected user ID
      });
      setResponse({ status: "success", message: res.data.message });
      setOpenDialog(true); // Open the dialog when the notification is sent successfully
    } catch (error) {
      setResponse({
        status: "error",
        message: error.response?.data.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
      resetForm();
    }
  };

  const validateForm = () => {
    if (!title || !message || !selectedUser) {
      setResponse({ status: "error", message: "All fields are required" });
      setOpenSnackbar(true);
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setTitle("");
    setMessage("");
    setType("Update");
    setSelectedUser("");
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 3,
        p: 2,
        border: 1,
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Send Notification
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        size="small"
        margin="dense"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Message"
        variant="outlined"
        fullWidth
        size="small"
        margin="dense"
        multiline
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <FormControl variant="outlined" fullWidth size="small" margin="dense">
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          label="Type"
        >
          <MenuItem value="Update">Update</MenuItem>
          <MenuItem value="Alert">Alert</MenuItem>
          <MenuItem value="Reminder">Reminder</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth size="small" margin="dense">
        <InputLabel>User</InputLabel>
        <Select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          label="User"
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendNotification}
        fullWidth
        size="small"
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Send Notification"}
      </Button>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
          severity={response.status}
          sx={{ width: "100%" }}
        >
          {response.message}
        </Alert>
      </Snackbar>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Notification Sent</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {response.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Notifications;
