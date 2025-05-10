import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  Button,
  Collapse,
  useMediaQuery,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import theme from "../theme"; // Correct path to theme file
import Header from "../Header"; // Correct path to Header component
import HeroSection from "../HeroSection"; // Correct path to HeroSection component
import ProgramsSection from "../ProgramsSection"; // Correct path to ProgramsSection component
import BMICalculator from "../BMICalculator";
import Footer from "../Footer"; // Correct path to Footer component
import Feedback from "../Feedback";
// import Offers from "../Offers";

const video = [
  {
    title: "video1",
    link: "https://youtu.be/UBMk30rjy0o",
  },
 
  
];

const whyChooseUsContent = [
  {
    title: "Modern Equipment",
    description:
      "Experience the latest in fitness technology with our state-of-the-art equipment, designed to help you achieve maximum results in minimal time. From advanced cardio machines to cutting-edge strength training tools, we have everything you need to elevate your workout.",
    icon: <FitnessCenterIcon fontSize="large" />,
  },
  {
    title: "Healthy Nutrition Plan",
    description:
      "Our comprehensive nutrition plans are tailored to meet your individual needs and goals. Our expert nutritionists will guide you through balanced meal plans, offering delicious and healthy recipes that fuel your body and boost your performance.",
    icon: <RestaurantIcon fontSize="large" />,
  },
  {
    title: "Professional Training Plan",
    description:
      "Benefit from our professional training plans, crafted by certified trainers with years of experience. Whether you're a beginner or a seasoned athlete, our customized programs ensure you receive the guidance and support needed to reach your fitness milestones.",
    icon: <AssignmentIcon fontSize="large" />,
  },
  {
    title: "Unique to Your Needs",
    description:
      "We understand that every individual is unique, and so are their fitness needs. Our personalized approach focuses on creating bespoke workout plans that cater to your specific goals, preferences, and fitness levels, ensuring an effective and enjoyable fitness journey.",
    icon: <PersonOutlineIcon fontSize="large" />,
  },
];

const HomePage = () => {
  // State to manage the visibility of additional details
  const [openDetails, setOpenDetails] = useState({});

  // Toggle function for showing details
  const handleToggleDetails = (index) => {
    setOpenDetails((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <HeroSection />
      <ProgramsSection />
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          WHY CHOOSE US?
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          PUSH YOUR LIMITS FORWARD
        </Typography>

{/* <offers/> */}
<div className="grid grid-cols-2 gap-4 mb-10">
  


{video.map((e, idx) => {
          return (
            <iframe width="560" height="315" src="https://www.youtube.com/embed/nuzT2iJESFA?si=KdnQaHREftSitEDt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
               
          );
        })}
         {video.map((e, idx) => {
          return (
            <iframe width="560" height="315" src="https://www.youtube.com/embed/p2OPUi4xGrM?si=Da3TywpeuFi_kZjg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
               
          );
        })}
        {video.map((e, idx) => {
          return (
            <iframe width="560" height="315" src="https://www.youtube.com/embed/gunZRs8g6q8?si=ruC1TFNv_Z3w9L6z" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

               
          );
        })}

        {video.map((e, idx) => {
          return (
            <iframe width="560" height="315" src="https://www.youtube.com/embed/ucq966RvcdY?si=dexxyuVdF2BBgeXE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
               
          );
        })}
       
        {video.map((e, idx) => {
          return (
            <iframe width="560" height="315" src="https://www.youtube.com/embed/laIWV6qJWbk?si=bc3qhJ0nuDFxTzyf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
               
          );
        })}

{video.map((e, idx) => {
          return (
            <iframe width="560" height="315" src="https://www.youtube.com/embed/6WZjWZDsRXg?si=Gs_Y1rUsX9ygu-CF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> 
          );
        })}

</div>
       

        <Grid container spacing={4}>
          {whyChooseUsContent.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  p: 3,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.3)",
                  },
                  borderRadius: 3,
                  bgcolor: "background.paper", // Same color for all cards
                  color: "text.primary",
                   boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              >
                <Box sx={{ mb: 2 }}>{item.icon}</Box>
                <CardContent>
                  <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>
                    {item.title}
                  </Typography>
                  <Collapse in={openDetails[index]}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {item.description}
                    </Typography>
                  </Collapse>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2 }}
                    onClick={() => handleToggleDetails(index)}
                  >
                    {openDetails[index] ? "Show Less" : "Learn More"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <BMICalculator />
      <Feedback />
      <Footer />
    </ThemeProvider>
  );
};

export default HomePage;
