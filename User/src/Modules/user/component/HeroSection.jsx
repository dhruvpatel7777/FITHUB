import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import { toast } from 'react-toastify';

const HeroSection = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newClassDialog, setNewClassDialog] = useState(false);
  const [newClassData, setNewClassData] = useState(null);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      navigate("/plans");
    } else {
      setOpenDialog(true);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogOk = () => {
    setOpenDialog(false);
    navigate("/login");
  };

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('newClass', (data) => {
      setNewClassData(data);
      setNewClassDialog(true);
      
      // Auto close after 10 seconds
      setTimeout(() => {
        setNewClassDialog(false);
      }, 10000);

      // Show toast notification
      toast.success(data.message);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 20 },
        textAlign: "center",
        bgcolor: "background.paper",
        backgroundImage: "url(/assets/images/hero-background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6))",
          zIndex: 1,
        },
      }}
    >
      <Container
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          textAlign: "center",
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
          }}
        >
          Achieve Your Fitness Goals with Us
        </Typography>
        <Typography
          variant="h5"
          paragraph
          sx={{
            color: "white",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
            mb: 4,
            maxWidth: "600px",
            mx: "auto",
            fontSize: { xs: "1rem", md: "1.25rem" },
          }}
        >
          Join our community of fitness enthusiasts and get personalized
          training plans, expert guidance, and more. Your journey to a healthier
          you starts here.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            px: 4,
            py: 2,
            borderRadius: 4,
            fontWeight: 700,
            fontSize: { xs: "1rem", md: "1.125rem" },
            boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
            "&:hover": {
              backgroundColor: "#e64a19", // deepOrange darker shade
              boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
            },
          }}
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </Container>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Login Required"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You need to be logged in to access the membership page. Please log in first.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogOk} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={newClassDialog}
        onClose={() => setNewClassDialog(false)}
        aria-labelledby="new-class-dialog"
      >
        <DialogTitle>New Class Added! 🎉</DialogTitle>
        <DialogContent>
          {newClassData && (
            <DialogContentText>
              <Typography variant="h6">{newClassData.classData.name}</Typography>
              <Typography>Instructor: {newClassData.classData.instructor}</Typography>
              <Typography>
                Date: {new Date(newClassData.classData.date).toLocaleDateString()}
              </Typography>
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewClassDialog(false)}>Close</Button>
          <Button 
            onClick={() => {
              setNewClassDialog(false);
              navigate('/classes');
            }} 
            variant="contained"
          >
            View Class
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HeroSection;