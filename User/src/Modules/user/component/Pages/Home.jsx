import React from "react";
import { Box, Typography, Paper, Grid, Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import GroupIcon from "@mui/icons-material/Group";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StoreIcon from "@mui/icons-material/Store";
import FeedbackIcon from "@mui/icons-material/Feedback";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
      

const Home = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: deepOrange[100],
            }}
          >
            <Avatar sx={{ bgcolor: deepOrange[500] }}>
              <GroupIcon />
            </Avatar>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Membership Plans
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              View and subscribe to membership plans.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: deepOrange[100],
            }}
          >
            <Avatar sx={{ bgcolor: deepOrange[500] }}>
              <FitnessCenterIcon />
            </Avatar>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Book Classes
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Browse and book gym classes.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: deepOrange[100],
            }}
          >
            <Avatar sx={{ bgcolor: deepOrange[500] }}>
              <MonetizationOnIcon />
            </Avatar>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Payment Management
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Manage your payments for memberships and services.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: deepOrange[100],
            }}
          >
            <Avatar sx={{ bgcolor: deepOrange[500] }}>
              <StoreIcon />
            </Avatar>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Buy Products
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Browse and buy gym products and merchandise.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: deepOrange[100],
            }}
          >
            <Avatar sx={{ bgcolor: deepOrange[500] }}>
              <FeedbackIcon />
            </Avatar>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Feedback
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Provide feedback about the gym.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: deepOrange[100],
            }}
          >
            <Avatar sx={{ bgcolor: deepOrange[500] }}>
              <NotificationsIcon />
            </Avatar>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Notifications
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              View notifications and announcements.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12}>
  <Paper
    sx={{
      p: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: deepOrange[100],
    }}
  >
    <Typography variant="h6" sx={{ mt: 2 }}>
      Welcome to Fithub 💪
    </Typography>
    <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
      Watch this quick video about our gym and facilities!
    </Typography>
    
  </Paper>
</Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: deepOrange[100],
            }}
          >
            <Avatar sx={{ bgcolor: deepOrange[500] }}>
              <CalendarTodayIcon />
            </Avatar>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Class Schedule
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              View the schedule for gym classes.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
