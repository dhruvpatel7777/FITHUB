import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupIcon from "@mui/icons-material/Group";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StoreIcon from "@mui/icons-material/Store";
import FeedbackIcon from "@mui/icons-material/Feedback";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Link, useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { deepOrange } from "@mui/material/colors";

const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: deepOrange[500], // Custom background color
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const routes = [
  {
    path: "/user/overview",
    name: "Overview",
    icon: <GroupIcon />,
  },
  {
    path: "/user/membership-plans",
    name: "Membership Plans",
    icon: <GroupIcon />,
  },
  {
    path: "/user/class-management",
    name: "Book Classes",
    icon: <FitnessCenterIcon />,
  },
  {
    path: "/user/payment-management",
    name: "Payment",
    icon: <MonetizationOnIcon />,
  },
  {
    path: "/user/products-merchandise",
    name: "Products",
    icon: <StoreIcon />,
  },
  {
    path: "/user/feedback",
    name: "Feedback",
    icon: <FeedbackIcon />,
  },
  {
    path: "/user/notifications",
    name: "Notifications",
    icon: <NotificationsIcon />,
  },
  {
    path: "/user/class-schedule",
    name: "Class Schedule",
    icon: <CalendarTodayIcon />,
  },
];

const Navigation = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For menu anchor
  const location = useLocation();

  useEffect(() => {
    // Close drawer on initial load to avoid obstructing view unnecessarily
    setOpen(false);
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Add your logout logic here
    handleMenuClose();
    console.log("Logout clicked");
  };

  const handleMyAccount = () => {
    // Add your "My Account" logic here
    handleMenuClose();
    console.log("My Account clicked");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: "36px", ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <SportsGymnasticsIcon sx={{ mr: 1 }} /> {/* Add the gym icon */}
          <Typography variant="h6" noWrap component="div">
            User Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* User Avatar */}
          <IconButton color="inherit" onClick={handleMenuClick}>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>U</Avatar>
          </IconButton>
          {/* Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMyAccount}>My Account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <FitnessCenterIcon
            sx={{ fontSize: "38px", color: deepOrange[500] }}
          />
          <Typography variant="h5" sx={{ ml: 1, color: deepOrange[500] }}>
            FITHUB
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {routes.map((route, index) => (
            <ListItem
              button
              key={index}
              component={Link}
              to={route.path}
              selected={location.pathname === route.path}
            >
              <ListItemIcon sx={{ color: deepOrange[500] }}>
                {route.icon}
              </ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: theme.palette.background.default,
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          padding: theme.spacing(3),
        }}
      >
        <DrawerHeader />
        {/* Content will be rendered here */}
      </Box>
    </Box>
  );
};

export default Navigation;