import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Card,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { deepOrange, lightGreen } from "@mui/material/colors";

const ManageGymProfile = () => {
  const [gymProfile, setGymProfile] = useState({});
  const [formValues, setFormValues] = useState({
    name: "",
    address: "",
    contact: "",
    hours: "",
    image: null,
    imageUrl: "",
    specialEvents: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchGymProfile = async () => {
      try {
        // Fetching dummy data
        const data = {
          name: "Gym Extreme",
          address: "123 Fitness St, Gym City",
          contact: "+1 234-567-890",
          hours: "Mon-Sun: 6:00 AM - 10:00 PM",
          imageUrl:
            "https://www.the-connaught.co.uk/siteassets/aman-spa/gym/gym-hero.jpg",
          specialEvents: ["Yoga Workshop", "Zumba Class"],
        };
        setGymProfile(data);
        setFormValues({
          name: data.name,
          address: data.address,
          contact: data.contact,
          hours: data.hours,
          imageUrl: data.imageUrl,
          specialEvents: data.specialEvents.join(", "),
        });
        setEvents(data.specialEvents);
      } catch (error) {
        console.error("Error fetching gym profile:", error);
      }
    };

    fetchGymProfile();
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenEventDialog = () => {
    setEventDialogOpen(true);
  };

  const handleCloseEventDialog = () => {
    setEventDialogOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormValues({
        ...formValues,
        image: file,
        imageUrl: URL.createObjectURL(file),
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleAddEvent = () => {
    if (eventName.trim() && !events.includes(eventName.trim())) {
      setEvents([...events, eventName.trim()]);
      setEventName("");
    }
  };

  const handleDeleteEvent = (event) => {
    setEvents(events.filter((e) => e !== event));
  };

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("address", formValues.address);
      formData.append("contact", formValues.contact);
      formData.append("hours", formValues.hours);
      formData.append("specialEvents", JSON.stringify(events));
      if (formValues.image) {
        formData.append("image", formValues.image);
      }

      // Simulate a POST request
      const response = await fetch("/api/gym-profile", {
        method: "PUT",
        body: formData,
      });
      if (!response.ok) throw new Error("Network response was not ok");

      setSnackbarMessage("Gym profile updated successfully!");
      setOpenDialog(false);
    } catch (error) {
      console.error("Error updating gym profile:", error);
      setSnackbarMessage("Failed to update gym profile.");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        p: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}
      >
        Manage Gym Profile
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Card for Gym Profile */}
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          boxShadow: 3,
          p: 4, // Increased padding
          borderRadius: 2,
          mb: 3,
          bgcolor: "#f9f9f9",
          border: `1px solid ${deepOrange[200]}`,
          height: "auto", // Ensure height adjusts to content
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            mb: 2,
          }}
        >
          {/* Edit Profile Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
            startIcon={<PhotoCameraIcon />}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              bgcolor: deepOrange[500],
              "&:hover": { bgcolor: deepOrange[600] },
            }}
          >
            Edit Profile
          </Button>

          {gymProfile.imageUrl && (
            <CardMedia
              component="img"
              height="300" // Increased image height
              image={gymProfile.imageUrl}
              alt="Gym Image"
              sx={{
                objectFit: "cover",
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                mb: 2,
              }}
            />
          )}
          <Typography
            variant="h5"
            component="div"
            sx={{ mb: 1, fontWeight: "bold" }}
          >
            {gymProfile.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Address: {gymProfile.address}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Contact: {gymProfile.contact}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Hours: {gymProfile.hours}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            ml: { md: 2 },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ mb: 2, fontWeight: "bold" }}
          >
            Special Events
          </Typography>
          <List sx={{ mb: 2 }}>
            {events.map((event, index) => (
              <ListItem key={index}>
                <ListItemText primary={event} />
                <ListItemSecondaryAction>
                  <Tooltip title="Delete Event">
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteEvent(event)}
                      aria-label="delete"
                      sx={{ color: deepOrange[500] }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpenEventDialog}
            startIcon={<AddCircleIcon />}
            sx={{
              bgcolor: lightGreen[500],
              "&:hover": { bgcolor: lightGreen[600] },
            }}
          >
            Add Event
          </Button>
        </Box>
      </Card>

      {/* Dialog for editing gym profile */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>Edit Gym Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Gym Name"
            fullWidth
            value={formValues.name}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="address"
            label="Address"
            fullWidth
            value={formValues.address}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="contact"
            label="Contact Number"
            fullWidth
            value={formValues.contact}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="hours"
            label="Hours of Operation"
            fullWidth
            value={formValues.hours}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="specialEvents"
            label="Special Events (comma separated)"
            fullWidth
            value={formValues.specialEvents}
            onChange={(e) =>
              setFormValues({ ...formValues, specialEvents: e.target.value })
            }
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Profile Image</Typography>
            <CardMedia
              component="img"
              height="200" // Adjusted height
              image={formValues.imageUrl || gymProfile.imageUrl}
              alt="Selected Image"
              sx={{
                objectFit: "cover",
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                mb: 2,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              component="label"
              sx={{
                mb: 2,
                bgcolor: deepOrange[500],
                "&:hover": { bgcolor: deepOrange[600] },
              }}
            >
              Upload Image
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFormChange}
                hidden
              />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveProfile}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for adding special events */}
      <Dialog open={eventDialogOpen} onClose={handleCloseEventDialog}>
        <DialogTitle>Add Special Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Event Name"
            fullWidth
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEventDialog}>Cancel</Button>
          <Button onClick={handleAddEvent}>Add Event</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarMessage.includes("success") ? "success" : "error"}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageGymProfile;
