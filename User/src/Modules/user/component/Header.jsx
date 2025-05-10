import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
  Avatar,
  Popover, // Import Popover
} from "@mui/material";
import {
  Menu as MenuIcon,
  ShoppingCart,
  Notifications,
} from "@mui/icons-material";
import DumbbellIcon from "@mui/icons-material/FitnessCenter";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { deepOrange } from "@mui/material/colors";
import { AuthContext } from "./GlobalContext";
import axios from "axios";
import config from "../../../config";

const Header = () => {
  const theme = useTheme();
  const host = config.host;
  const { carts, notifications } = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State to handle Popover
  const navigate = useNavigate();
  const token = localStorage.getItem("auth-token");

  useEffect(() => {
    if (token) {
      axios
        .get(`${host}/api/users/getuser`, {
          headers: { "auth-token": token },
        })
        .then((res) => {
          setUserDetails(res.data.user);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [token, host]);

  const performLogout = () => {
    localStorage.removeItem("auth-token");
    setUserDetails({});
    navigate("/login");
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleClickLogout = () => setOpenDialog(true);

  const handleConfirmLogout = () => {
    performLogout();
    handleCloseDialog();
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget); // Open Popover when avatar is clicked
  };

  const handlePopoverClose = () => {
    setAnchorEl(null); // Close Popover
  };

  const isPopoverOpen = Boolean(anchorEl);
  const popoverId = isPopoverOpen ? "simple-popover" : undefined;

  const menuItems = [
    { text: "Home", path: "/" },
    { text: "Nutrition", path: "/neutrition" },
    { text: "Membership Plans", path: "/plans" },
    { text: "Products", path: "/products" },
    { text: "Classes", path: "/classes" },
    { text: "Status", path: "/status" },
    { text: "About Us", path: "/aboutus" },
  ];

  const DrawerMenu = () => (
    <Box
      sx={{
        width: 250,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} component={Link} to={item.path}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        color="primary"
        sx={{ boxShadow: theme.shadows[5] }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: "block", md: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            <DumbbellIcon sx={{ mr: 1 }} /> FITHUB
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{ textTransform: "none", fontWeight: "bold" }}
              >
                {item.text}
              </Button>
            ))}
            <IconButton
              color="inherit"
              component={Link}
              to="/cart"
              aria-label="cart"
            >
              <Badge badgeContent={carts?.length || 0} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton
              color="inherit"
              component={Link}
              to="/notifications"
              aria-label="notifications"
            >
              <Badge
                badgeContent={notifications?.length || 0}
                color="secondary"
              >
                <Notifications />
              </Badge>
            </IconButton>
            {token && (
              <Avatar
                sx={{
                  bgcolor: deepOrange[500],
                  color: theme.palette.primary.contrastText,
                }}
                onClick={handleAvatarClick} // Handle click event
                aria-describedby={popoverId} // Set Popover ID for accessibility
              >
                {userDetails?.name?.charAt(0).toUpperCase() || "U"}
              </Avatar>
            )}
            <Button
              variant="contained"
              sx={{
                borderRadius: 20,
                "&:hover": {
                  fontWeight: "bold",
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.main,
                  borderColor: theme.palette.primary.main,
                },
              }}
              onClick={token ? handleClickLogout : () => navigate("/login")}
            >
              {token ? "Log out" : "Login"}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Popover
        id={popoverId}
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography>{userDetails?.name || "User"}</Typography>
        </Box>
      </Popover>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <DrawerMenu />
      </Drawer>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;