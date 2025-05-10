import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Avatar,
  ThemeProvider,
} from "@mui/material";
import theme from "./theme";
import Header from "./Header";
import Footer from "./Footer";
import { createTheme } from "@mui/material/styles";


// Custom theme with Poppins font
const customTheme = createTheme({
  ...theme,
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    h1: {
      fontWeight: 700,
      color: '#dc004e',
    },
    h4: {
      fontWeight: 600,
    },
  },
});

// Common Styles
const commonStyles = {
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 12px 24px rgba(0,0,0,0.3)",
  },
  borderRadius: 2,
  bgcolor: "background.paper",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  p: 2,
};

const TeamMember = ({ member }) => (
  <Card
    sx={{
      ...commonStyles,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Avatar
      alt={member.name}
      src={member.image}
      sx={{ width: 135, height: 135, mb: 2 }}
    />
    <CardContent sx={{ textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        {member.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {member.role}
      </Typography>
    </CardContent>
  </Card>
);

const AboutUs = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Founder & Head Trainer",
      image: "https://img.freepik.com/free-photo/portrait-smiling-businessman-3d-rendering-3d-illustration_1142-51315.jpg?semt=ais_hybrid",
    },
    {
      name: "Jane Smith",
      role: "Nutrition Expert",
      image: "https://img.freepik.com/free-photo/3d-illustration-man-brown-leather-jacket-with-mustache_1142-51045.jpg?semt=ais_hybrid",
    },
    {
      name: "Mike Johnson",
      role: "Professional Trainer",
      image: "https://img.freepik.com/free-photo/3d-illustration-businessman-with-glasses-sitting-table-office_1142-55609.jpg?semt=ais_hybrid",
    },
  ];

  return (
    <ThemeProvider theme={customTheme}>
      <Header />
      <Box
        sx={{
          position: "relative",
          minHeight: "300px",
          backgroundImage: "url(/assets/images/about-hero.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          py: 8,
          mb: 4,
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
            zIndex: 3,
          }}
        >
          About FITHUB 
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
          Your Ultimate Fitness Partner
        </Typography>
      </Box>
      <Container id="about-section" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          style={{ paddingBottom: "18px" }}
          gutterBottom
        >
          Welcome to FITHUB 
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          style={{ paddingBottom: "18px" }}
          paragraph
        >
          **FITHUB** is dedicated to providing a comprehensive and personalized
          fitness experience for our members. Our mission is to help you achieve
          your fitness goals and maintain a healthy lifestyle through expert
          guidance, innovative programs, and a supportive community. We offer
          state-of-the-art facilities, experienced trainers, and a variety of
          fitness classes tailored to your needs.
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          style={{ paddingBottom: "18px" }}
          gutterBottom
        >
          Our Mission
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          style={{ paddingBottom: "18px" }}
          paragraph
        >
          At **FITHUB**, our mission is to inspire and empower individuals to
          lead healthier lives. We strive to create an inclusive and motivating
          environment where everyone can thrive, regardless of their fitness
          level or experience. Our commitment is to provide you with the tools,
          support, and encouragement needed to reach your fitness potential.
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          style={{ paddingBottom: "18px" }}
          gutterBottom
        >
          Our Vision
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          style={{ paddingBottom: "18px" }}
          paragraph
        >
          Our vision is to be a leading fitness community that transforms lives
          by providing the highest quality training, nutrition, and wellness
          programs. We aim to foster a culture of health, positivity, and
          personal growth, creating a space where members are motivated to
          achieve their goals and maintain a balanced lifestyle.
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          style={{ paddingBottom: "18px" }}
          gutterBottom
        >
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <TeamMember member={member} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default AboutUs;
