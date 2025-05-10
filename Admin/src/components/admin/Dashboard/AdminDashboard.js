import React, { useContext, useState } from "react";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Container,
  IconButton,
  Divider,
  styled,
  Badge,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Link, Outlet, useLocation,useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EventIcon from "@mui/icons-material/Event";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import NotificationsIcon from "@mui/icons-material/Notifications";
import ReceiptIcon from "@mui/icons-material/Receipt";
import StoreIcon from "@mui/icons-material/Store";
import FeedbackIcon from "@mui/icons-material/Feedback";
import MenuIcon from "@mui/icons-material/Menu";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import { deepOrange } from "@mui/material/colors";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../GlobalContext";

const drawerWidth = 265;

// Styled DrawerHeader component for the Overview page
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

const AdminDashboard = () => {
  const {replyNotificationsCount}=useContext(AuthContext)
  console.log(replyNotificationsCount,'replyNotificationsCount');
  
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation(); // Get the current location
  const [selectedIndex, setSelectedIndex] = React.useState(0); // State to manage the selected list item
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    // Update the selected index based on the current route
    const path = location.pathname;
    switch (path) {
      case "admin/overview":
        setSelectedIndex(0);
        break;
      case "admin/members":
        setSelectedIndex(1);
        break;
      case "admin/membership-plans":
        setSelectedIndex(2);
        break;
      case "admin/classes":
        setSelectedIndex(3);
        break;
      case "admin/manage-gym-profile":
        setSelectedIndex(4);
        break;
      case "admin/bookings":
        setSelectedIndex(5);
        break;
      case "admin/notifications":
        setSelectedIndex(6);
        break;
      case "admin/transactions":
        setSelectedIndex(7);
        break;
      case "admin/products":
        setSelectedIndex(8);
        break;
      case "admin/feedback":
        setSelectedIndex(9);
        break;
      default:
        setSelectedIndex(-1);
    }
  }, [location]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    setLogoutDialogOpen(true); // Open the dialog
  };

 const handleDialogClose = (confirm) => {
   setLogoutDialogOpen(false); // Close the dialog
   if (confirm) {
     // Proceed with the logout logic
     console.log("Logout clicked");
     localStorage.removeItem("auth-token");
     navigate("/login");
   }
 };

  const drawer = (
    <div>
      <DrawerHeader>
        <FitnessCenterIcon sx={{ fontSize: "60px", color: deepOrange[500] }} />
        <Typography
          variant="h5"
          sx={{
            ml: 1,
            color: deepOrange[500],
            fontWeight: 800,
            fontSize: "2rem", // Adjust the size as needed
          }}
        >
          FITHUB
        </Typography>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem
          button
          component={Link}
          to="/"
          selected={selectedIndex === 0}
          onClick={() => setSelectedIndex(0)}
          sx={{ bgcolor: selectedIndex === 0 ? deepOrange[100] : "inherit" }}
        >
          <ListItemIcon>
            <HomeIcon sx={{ color: deepOrange[500] }} />
          </ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="admin/membership-plans"
          selected={selectedIndex === 2}
          onClick={() => setSelectedIndex(2)}
          sx={{ bgcolor: selectedIndex === 2 ? deepOrange[100] : "inherit" }}
        >
          <ListItemIcon>
            <CardMembershipIcon sx={{ color: deepOrange[500] }} />
          </ListItemIcon>
          <ListItemText primary="Membership Plans" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="admin/members"
          selected={selectedIndex === 1}
          onClick={() => setSelectedIndex(1)}
          sx={{ bgcolor: selectedIndex === 1 ? deepOrange[100] : "inherit" }}
        >
          <ListItemIcon>
            <PeopleIcon sx={{ color: deepOrange[500] }} />
          </ListItemIcon>
          <ListItemText primary="Manage Members" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="admin/classes"
          selected={selectedIndex === 3}
          onClick={() => setSelectedIndex(3)}
          sx={{ bgcolor: selectedIndex === 3 ? deepOrange[100] : "inherit" }}
        >
          <ListItemIcon>
            <EventIcon sx={{ color: deepOrange[500] }} />
          </ListItemIcon>
          <ListItemText primary="Classes" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="admin/bookings"
          selected={selectedIndex === 3}
          onClick={() => setSelectedIndex(3)}
          sx={{ bgcolor: selectedIndex === 3 ? deepOrange[100] : "inherit" }}
        >
          <ListItemIcon>
            <LibraryBooksIcon sx={{ color: deepOrange[500] }} />
          </ListItemIcon>
          <ListItemText primary="Class Bookings" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="admin/notifications"
          selected={selectedIndex === 5}
          onClick={() => setSelectedIndex(5)}
          sx={{ bgcolor: selectedIndex === 5 ? deepOrange[100] : "inherit" }}
        >
          <ListItemIcon>
            <NotificationsIcon sx={{ color: deepOrange[500] }} />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="admin/transactions"
          selected={selectedIndex === 6}
          onClick={() => setSelectedIndex(6)}
          sx={{ bgcolor: selectedIndex === 6 ? deepOrange[100] : "inherit" }}
        >
          <ListItemIcon>
            <ReceiptIcon sx={{ color: deepOrange[500] }} />
          </ListItemIcon>
          <ListItemText primary="Transactions" />
          {/* <ListItemText primary="Transactions" /> */}
        </ListItem>
        <ListItem
          button
          component={Link}
          to="admin/products"
          selected={selectedIndex === 7}
          onClick={() => setSelectedIndex(7)}
          sx={{ bgcolor: selectedIndex === 7 ? deepOrange[100] : "inherit" }}
        >
          <ListItemIcon>
            <StoreIcon sx={{ color: deepOrange[500] }} />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="admin/feedback"
          selected={selectedIndex === 8}
          onClick={() => setSelectedIndex(8)}
          sx={{ bgcolor: selectedIndex === 8 ? deepOrange[100] : "inherit" }}
        >
          <ListItemIcon>
            <FeedbackIcon sx={{ color: deepOrange[500] }} />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: deepOrange[500], // Set the AppBar color to deep orange
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <SportsGymnasticsIcon sx={{ mr: 1 }} /> {/* Add the gym icon */}
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} /> {/* Spacer */}
          <IconButton color="inherit">
            <Badge badgeContent={replyNotificationsCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          mt: 8, // Adjusts for AppBar height
        }}
      >
        <Container>
          <Outlet />
        </Container>
      </Box>
      <Dialog open={logoutDialogOpen} onClose={() => handleDialogClose(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
