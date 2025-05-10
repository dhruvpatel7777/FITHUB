import React, { useEffect, useState } from 'react';
import Header from '../Header';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Veg } from '../../../data/NeutritionVeg'; // Corrected import path
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { NonVeg } from '../../../data/NeutritionNonVeg'; // Corrected import path

export default function Nutrition() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log("Veg updated:", Veg);
    console.log("NonVeg updated:", NonVeg);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Box
        sx={{
          width: '90%',
          maxWidth: '1200px',
          margin: '80px auto',
          padding: '20px',
          backgroundColor: theme.palette.background.default,
          borderRadius: '12px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Tabs Section */}
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            textAlign: 'center',
            margin: '0 auto 20px',
            padding: '10px',
            borderRadius: '8px',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="nutrition tabs"
            textColor="inherit"
            indicatorColor="secondary"
            centered
          >
            <Tab label="All" {...a11yProps(0)} />
            <Tab label="Veg" {...a11yProps(1)} />
            <Tab label="Non-Veg" {...a11yProps(2)} />
          </Tabs>
        </Box>

        {/* All Tab Panel */}
        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={3}>
            {
              Veg.length >= 1
                ? Veg.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          boxShadow: 3,
                          borderRadius: 2,
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          '&:hover': {
                            transform: 'scale(1.05)', // Slightly enlarge the card
                            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
                          },
                        }}
                      >
                        <CardActionArea sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <img
                            src={item.image}
                            title={item.name}
                            style={{ width: "100%", height: "250px", objectFit: "cover" }}
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                              {item.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                              {item.desc}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))
                : <Typography sx={{ textAlign: 'center', width: '100%', fontSize: '1.2rem', color: theme.palette.text.primary }}>No items found</Typography>
            }
          </Grid>
          {/* Non-Veg Section */}
          <Grid container spacing={3} style={{ marginTop: '6px' }}>
            {
              NonVeg.length >= 1
                ? NonVeg.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          boxShadow: 3,
                          borderRadius: 2,
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          '&:hover': {
                            transform: 'scale(1.05)', // Slightly enlarge the card
                            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
                          },
                        }}
                      >
                        <CardActionArea sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <img
                            src={item.image}
                            title={item.name}
                            style={{ width: "100%", height: "250px", objectFit: "cover" }}
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                              {item.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                              {item.desc}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))
                : <Typography sx={{ textAlign: 'center', width: '100%', fontSize: '1.2rem', color: theme.palette.text.primary }}>No items found</Typography>
            }
          </Grid>
        </CustomTabPanel>

        {/* Veg Tab Panel */}
        <CustomTabPanel value={value} index={1}>
          <Grid container spacing={3}>
            {
              Veg.length >= 1
                ? Veg.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          boxShadow: 3,
                          borderRadius: 2,
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          backgroundColor: "red",
                          '&:hover': {
                            transform: 'scale(1.05)', // Slightly enlarge the card
                            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
                          },
                        }}
                      >
                        <CardActionArea sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <img
                            src={item.image}
                            title={item.name}
                            style={{ width: "100%", height: "250px", objectFit: "cover" }}
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                              {item.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                              {item.desc}
                            </Typography>
                          </CardContent>
                          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            {item.protine}
                          </Typography>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))
                : <Typography sx={{ textAlign: 'center', width: '100%', fontSize: '1.2rem', color: theme.palette.text.primary }}>No items found</Typography>
            }
          </Grid>
        </CustomTabPanel>

        {/* Non-Veg Tab Panel */}
        <CustomTabPanel value={value} index={2}>
          <Grid container spacing={3}>
            {
              NonVeg.length >= 1
                ? NonVeg.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        sx={{
                          height: "100%",
                          display: 'flex',
                          flexDirection: 'column',
                          boxShadow: 3,
                          borderRadius: 2,
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          '&:hover': {
                            transform: 'scale(1.05)', // Slightly enlarge the card
                            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
                          },
                        }}
                      >
                        <CardActionArea sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <img
                            src={item.image}
                            title={item.name}
                            style={{ width: "100%", height: "250px", objectFit: "cover" }}
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                              {item.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                              {item.desc}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))
                : <Typography sx={{ textAlign: 'center', width: '100%', fontSize: '1.2rem', color: theme.palette.text.primary }}>No items found</Typography>
            }
          </Grid>
        </CustomTabPanel>
      </Box>
    </ThemeProvider>
  );
}

// CustomTabPanel Component
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}