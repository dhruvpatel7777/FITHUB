import React, { useContext } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import InventoryIcon from "@mui/icons-material/Inventory";
import EventIcon from "@mui/icons-material/Event";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { deepOrange, green, blue, teal, red, yellow, purple, pink } from "@mui/material/colors";
import { AuthContext } from "../GlobalContext";
import moment from "moment";

// Register the components needed for the charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const OverviewSection = () => {
  const { members, plans, classes, products } = useContext(AuthContext);

  // Function to get monthly membership growth data
  const getMonthlyGrowthData = () => {
    const monthlyCounts = {};

    members.forEach((member) => {
      const monthYear = moment(member.createdAt).format("MMM YYYY");
      if (monthlyCounts[monthYear]) {
        monthlyCounts[monthYear]++;
      } else {
        monthlyCounts[monthYear] = 1;
      }
    });

    const labels = Object.keys(monthlyCounts);
    const data = Object.values(monthlyCounts);

    return { labels, data };
  };

  const { labels: growthLabels, data: growthData } = getMonthlyGrowthData();

  // Prepare data for Membership Growth chart
  const memberGrowthData = {
    labels: growthLabels,
    datasets: [
      {
        label: "Membership Growth",
        data: growthData,
        borderColor: deepOrange[500],
        backgroundColor: "rgba(255, 87, 34, 0.2)",
        fill: true,
      },
    ],
  };

  // Prepare data for Subscription Type Distribution chart
  const subscriptionTypeData = () => {
    const subscriptionCounts = {};

    members.forEach((member) => {
      const type = member.subscription.name;
      if (subscriptionCounts[type]) {
        subscriptionCounts[type]++;
      } else {
        subscriptionCounts[type] = 1;
      }
    });

    const labels = Object.keys(subscriptionCounts);
    const data = Object.values(subscriptionCounts);

    return { labels, data };
  };

  const { labels: subscriptionLabels, data: subscriptionData } =
    subscriptionTypeData();

  const subscriptionDataChart = {
    labels: subscriptionLabels,
    datasets: [
      {
        label: "Subscription Type Distribution",
        data: subscriptionData,
        backgroundColor: [green[500], teal[500], red[500], blue[500]],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <Box sx={{ p: 2 }}>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Overview of Key Metrics
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="textSecondary">
                    Total Members
                  </Typography>
                  <Typography variant="h4" color="textPrimary">
                    {members?.length}
                  </Typography>
                  <PeopleIcon sx={{ color: deepOrange[500], fontSize: 40 }} />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="textSecondary">
                    Membership Plans
                  </Typography>
                  <Typography variant="h4" color="textPrimary">
                    {plans?.length}
                  </Typography>
                  <FitnessCenterIcon sx={{ color: blue[500], fontSize: 40 }} />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="textSecondary">
                    Classes Scheduled
                  </Typography>
                  <Typography variant="h4" color="textPrimary">
                    {classes?.length}
                  </Typography>
                  <EventIcon sx={{ color: pink[500], fontSize: 40 }} />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="textSecondary">
                    Total Products
                  </Typography>
                  <Typography variant="h4" color="textPrimary">
                    {products?.length}
                  </Typography>
                  <InventoryIcon sx={{ color: purple[500], fontSize: 40 }} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Membership Growth
                  </Typography>
                  <Line data={memberGrowthData} options={chartOptions} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Subscription Type Distribution
                  </Typography>
                  <Pie data={subscriptionDataChart} options={chartOptions} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OverviewSection;
