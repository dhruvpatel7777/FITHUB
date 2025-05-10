import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Divider,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Send, Delete, Cancel } from "@mui/icons-material";
import { deepOrange } from "@mui/material/colors";
import axios from "axios";
import config from "../../../config";
import { toast } from "react-toastify";
import { AuthContext } from "../GlobalContext";

// Set up Axios instance with base URL from config
const api = axios.create({
  baseURL: `${config.host}/api`,
  timeout: 1000,
});

const notificationTypes = [
  { value: "update", label: "Update" },
  { value: "announcement", label: "Announcement" },
  { value: "reminder", label: "Reminder" },
];

const Notifications = () => {
  const { notifications, loading, error, setError, setNotificationsCount } =
    useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    type: "",
    message: "",
    link: "",
  });
  const [formErrors, setFormErrors] = useState({
    type: "",
    message: "",
    link: "",
  });

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setFormValues({ type: "", message: "", link: "" });
    setFormErrors({ type: "", message: "", link: "" });
  };

  const handleSend = () => {
    let isValid = true;
    const errors = { type: "", message: "", link: "" };

    if (!formValues.type) {
      errors.type = "Notification type is required.";
      isValid = false;
    }

    if (!formValues.message.trim()) {
      errors.message = "Notification message is required.";
      isValid = false;
    }
    if (isValid) {
      // Add notification logic
      api
        .post("/notifications", formValues)
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.message);
            setNotificationsCount((prev) => prev + 1);
            handleClose();
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((err) => setError(err.message));
    } else {
      setFormErrors(errors);
    }
  };

  const handleDelete = (id) => {
    api
      .delete(`/notifications/${id}`)
      .then((res) => {
        if (res.data.success) {
          setNotificationsCount((prev) => prev + 1);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => setError(err.message));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: "bold", color: deepOrange[700] }}
      >
        Send Notifications to Members
      </Typography>
      <Button
        variant="contained"
        startIcon={<Send />}
        onClick={handleOpen}
        sx={{
          mb: 3,
          bgcolor: deepOrange[600],
          "&:hover": { bgcolor: deepOrange[700] },
        }}
      >
        New Notification
      </Button>
      {loading && (
        <CircularProgress sx={{ display: "block", mx: "auto", mb: 2 }} />
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <List>
        {notifications?.length === 0 && (
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ textAlign: "center" }}
          >
            No notifications available.
          </Typography>
        )}
        {notifications.map((notification) => (
          <Paper
            key={notification._id}
            sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 1 }}
          >
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {notification.message}
                  </Typography>
                }
                secondary={
                  <>
                    {notification.type && (
                      <Typography variant="body2" color="textSecondary">
                        Type:{" "}
                        {
                          notificationTypes.find(
                            (type) => type.value === notification.type
                          ).label
                        }
                      </Typography>
                    )}
                    {notification.link && (
                      <Typography variant="body2" color="textSecondary">
                        Link:{" "}
                        <a
                          href={notification.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: deepOrange[600],
                            textDecoration: "underline",
                          }}
                        >
                          {notification.link}
                        </a>
                      </Typography>
                    )}
                    {notification.reply && (
                      <>
                        <Typography
                          variant="h6"
                          color="textPrimary"
                          sx={{ mt: 2 }}
                        >
                          User Reply by {notification?.userId?.name} (
                          {notification?.userId?.email})
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ mt: 1 }}
                        >
                          {notification?.reply}
                        </Typography>
                      </>
                    )}
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  color="error"
                  onClick={() => handleDelete(notification._id)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </Paper>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: deepOrange[600], color: "#fff" }}>
          New Notification
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Enter the details of the notification you want to send to the
            members.
          </DialogContentText>
          <FormControl fullWidth sx={{ mb: 2 }} error={!!formErrors.type}>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              name="type"
              value={formValues.type}
              onChange={handleChange}
              label="Type"
              variant="outlined"
            >
              {notificationTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {formErrors.type && (
              <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                {formErrors.type}
              </Typography>
            )}
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            name="message"
            label="Notification Message"
            type="text"
            fullWidth
            variant="outlined"
            value={formValues.message}
            onChange={handleChange}
            multiline
            rows={4}
            sx={{ mb: 2 }}
            error={!!formErrors.message}
            helperText={formErrors.message}
          />
          <TextField
            margin="dense"
            name="link"
            label="Optional Link"
            type="url"
            fullWidth
            variant="outlined"
            value={formValues.link}
            onChange={handleChange}
            sx={{ mb: 2 }}
            error={!!formErrors.link}
            helperText={formErrors.link}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" startIcon={<Cancel />}>
            Cancel
          </Button>
          <Button onClick={handleSend} color="primary" startIcon={<Send />}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Notifications;
