import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CardMedia,
  Container,
} from "@mui/material";

const programs = [
  {
    title: "Strength Training",
    image: "/assets/images/program-img1.jpg",
    description:
      "Build muscle and strength with our specialized training programs.",
    features: [
      "Personalized training plans",
      "Access to professional trainers",
      "State-of-the-art equipment",
    ],
  },
  {
    title: "Weight Training",
    image: "/assets/images/program-img2.jpg",
    description:
      "Achieve your weight goals with our comprehensive weight training.",
    features: [
      "Guided weight training sessions",
      "Nutritional advice",
      "Progress tracking",
    ],
  },
  {
    title: "Fat Losing",
    image: "/assets/images/program-img3.jpg",
    description: "Effective fat loss programs tailored to your needs.",
    features: [
      "Custom workout plans",
      "Group workout sessions",
      "Expert fitness advice",
    ],
  },
  {
    title: "Speed Building",
    image: "/assets/images/program-img4.jpg",
    description: "Improve your speed and agility for sports and fitness.",
    features: [
      "Speed and agility drills",
      "Performance tracking",
      "Team training options",
    ],
  },
];

const ProgramsSection = () => {
  return (
    <Container id="programs-section" sx={{ py: 8 }}>
      <Typography variant="h3" component="h2" align="center" gutterBottom>
        Our Programs
      </Typography>
      <Grid container spacing={4}>
        {programs.map((program, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.3)",
                },
                borderRadius: 2,
                bgcolor: "background.paper",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={program.image}
                alt={program.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  {program.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {program.description}
                </Typography>
                <Box>
                  {program.features.map((feature, idx) => (
                    <Typography
                      key={idx}
                      variant="body2"
                      color="text.secondary"
                    >
                      • {feature}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProgramsSection;
