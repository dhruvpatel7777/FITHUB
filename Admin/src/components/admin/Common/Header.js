import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { deepOrange } from "@mui/material/colors"; // Import deepOrange from the MUI colors

const Header = ({ handleDrawerToggle }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: deepOrange[500], // Set the background color to deeporange
        width: { sm: `calc(100% - 240px)` },
        ml: { sm: `240px` },
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
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          GymSync Admin Dashboard
        </Typography>
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
