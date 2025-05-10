import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Link,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        bgcolor: "background.paper",
        color: "text.secondary",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              FITHUB 
            </Typography>
            <Typography variant="body2">
            J-601, WHITE BUSINESS HUB, NR HANSPURA GAM,DEGAM, ROAD, NARODA, Ahmedabad, Gujarat 382330
            </Typography>
            <Typography variant="body2">Phone: (+91) 9854898742</Typography>
            <Typography variant="body2">Email: fithub@gmail.com</Typography>
            <Typography variant="body2">Open Hours: Mon-Sat 6am-9pm</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Typography variant="body2">
              <Link href="/" color="inherit" underline="hover">
                Home
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link href="/products" color="inherit" underline="hover">
                Products
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link href="/classes" color="inherit" underline="hover">
                Classes
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link href="/aboutus" color="inherit" underline="hover">
                About Us
              </Link>
            </Typography>
           
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton
                href="https://www.facebook.com"
                target="_blank"
                color="inherit"
                aria-label="Facebook"
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://www.twitter.com"
                target="_blank"
                color="inherit"
                aria-label="Twitter"
              >
                <Twitter />
              </IconButton>
              <IconButton
                href="https://www.instagram.com"
                target="_blank"
                color="inherit"
                aria-label="Instagram"
              >
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} FITHUB. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
