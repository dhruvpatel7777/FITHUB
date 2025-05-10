import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  List,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Chip,
  Divider,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Header from "./Header";
import Footer from "./Footer";
import { AuthContext } from "./GlobalContext";
import { Reply } from "@mui/icons-material";
import { toast } from "react-toastify";

const notificationTypes = [
  { value: "update", label: "Update" },
  { value: "announcement", label: "Announcement" },
  { value: "reminder", label: "Reminder" },
];

const UserNotifications = () => {
  const {
    notifications,
    loading,
    error,
    setNotificationsCount,
    host,
    userDetails,
  } = useContext(AuthContext);
  const [replyNotificationId, setReplyNotificationId] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");

  const handleReplyClick = (notificationId) => {
    setReplyNotificationId(
      replyNotificationId === notificationId ? null : notificationId
    );
    if (replyNotificationId !== notificationId) {
      const notification = notifications.find((n) => n._id === notificationId);
      setReplyMessage(notification.reply || "");
    } else {
      setReplyMessage("");
    }
  };

  const handleReplyChange = (e) => setReplyMessage(e.target.value);

  const handleReplySubmit = () => {
    if (!Object.keys(userDetails).length) {
      toast.error("Please login to submit a reply.");
      return;
    }
    if (replyMessage.trim()) {
      const data = { reply: replyMessage, user: userDetails._id };
      axios
        .put(`${host}/api/notifications/${replyNotificationId}`, data)
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.message);
            setReplyNotificationId(null);
            setReplyMessage("");
            setNotificationsCount((prev) => prev + 1);
            const updatedNotifications = notifications.map((notification) =>
              notification._id === replyNotificationId
                ? { ...notification, reply: replyMessage }
                : notification
            );
            setNotificationsCount(updatedNotifications);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((err) => console.error("Error submitting reply:", err));
    }
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          py: 8,
          mb: 4,
          textAlign: "center",
          "::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          },
          zIndex: 2,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            color: "white",
            textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)",
            mb: 2,
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "3rem" },
            zIndex: 3,
          }}
        >
          Notifications
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
            mb: 4,
            fontSize: { xs: "1rem", md: "1.25rem" },
            zIndex: 3,
          }}
        >
          Stay updated with our latest announcements and exclusive updates
          tailored just for you.
        </Typography>
      </Box>
      <Box sx={{ padding: 3, maxWidth: 800, margin: "0 auto" }}>
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
          }}
        >
          View Notifications
        </Typography>
        {loading && (
          <CircularProgress
            sx={{
              display: "block",
              margin: "0 auto",
              color: "#007bff",
            }}
          />
        )}
        {error && <Alert severity="error">{error}</Alert>}
        <List>
          {notifications?.length === 0 && (
            <Typography variant="h5" color="textSecondary" align="center">
              No notifications available.
            </Typography>
          )}
          {notifications.map((notification) => (
            <Card
              key={notification._id}
              sx={{
                mb: 2,
                borderRadius: 4,
                boxShadow: 2,
                bgcolor: "#f9f9f9",
                border: "1px solid #ddd",
                p: 2,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ mb: 1, fontWeight: "bold", color: "#333" }}
                >
                  {notification.message}
                </Typography>
                {notification.reply && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1, fontStyle: "italic", color: "#666" }}
                  >
                    Reply: {notification.reply}
                  </Typography>
                )}
                {notification.type && (
                  <Chip
                    label={
                      notificationTypes.find(
                        (type) => type.value === notification.type
                      ).label
                    }
                    color="primary"
                    sx={{ mb: 1 }}
                  />
                )}
                {notification.link && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    Link:{" "}
                    <a
                      href={notification.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#007bff",
                        textDecoration: "underline",
                        fontWeight: "bold",
                      }}
                    >
                      {notification.link}
                    </a>
                  </Typography>
                )}
                {replyNotificationId === notification._id ? (
                  <>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Your Reply"
                      type="text"
                      fullWidth
                      variant="outlined"
                      value={replyMessage}
                      onChange={handleReplyChange}
                      sx={{ mt: 2 }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 2,
                      }}
                    >
                      <Button
                        onClick={handleReplySubmit}
                        variant="contained"
                        color="primary"
                      >
                        Submit Reply
                      </Button>
                    </Box>
                  </>
                ) : (
                  <IconButton
                    onClick={() => handleReplyClick(notification._id)}
                    sx={{ mt: 2 }}
                  >
                    <Reply />
                  </IconButton>
                )}
              </CardContent>
              <Divider />
            </Card>
          ))}
        </List>
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default UserNotifications;
