import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EventIcon from "@mui/icons-material/Event";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ReceiptIcon from "@mui/icons-material/Receipt";
import StoreIcon from "@mui/icons-material/Store";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { deepOrange } from "@mui/material/colors"; // Import deepOrange color

const Sidebar = ({ handleDrawerClose }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: deepOrange[100], // Light deep orange background
          justifyContent: "space-between",
        }}
      >
        <FitnessCenterIcon sx={{ fontSize: "29px", color: deepOrange[500] }} />
        <Typography variant="h6" sx={{ ml: 1, color: deepOrange[500] }}>
          GymSync
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeIcon sx={{ color: deepOrange[500] }} />
          </ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItem>

        <ListItem button component={Link} to="/membership-plans">
          <ListItemIcon>
            <FitnessCenterIcon sx={{ color: deepOrange[500] }} />
          </ListItemIcon>
          <ListItemText primary="Manage Membership Plans" />
        </ListItem>

        <ListItem button component={Link} to="/members">
          <ListItemIcon>
            <PeopleIcon sx={{ color: deepOrange[500] }} />
          </ListItemIcon>
          <ListItemText primary="Manage Members" />
        </ListItem>
    
        <ListItem button component={Link} to="/classes">
          <ListItemIcon>
            <EventIcon sx={{ color: deepOrange[500] }} />
          </ListItemIcon>
          <ListItemText primary="Manage Classes" />
        </ListItem>
        <ListItem button component={Link} to="/notifications">
          <ListItemIcon>
            <NotificationsIcon sx={{ color: deepOrange[500] }} />
          </ListItemIcon>
          <ListItemText primary="Send Notifications" />
        </ListItem>
        <ListItem button component={Link} to="/transactions">
          <ListItemIcon>
            <ReceiptIcon sx={{ color: deepOrange[500] }} />
          </ListItemIcon>
          <ListItemText primary="Manage Transactions" />
        </ListItem>
        <ListItem button component={Link} to="/products">
          <ListItemIcon>
            <StoreIcon sx={{ color: deepOrange[500] }} />
          </ListItemIcon>
          <ListItemText primary="Manage Products" />
        </ListItem>
        <ListItem button component={Link} to="/feedback">
          <ListItemIcon>
            <FeedbackIcon sx={{ color: deepOrange[500] }} />
          </ListItemIcon>
          <ListItemText primary="Manage Feedback" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
