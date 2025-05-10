import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Snackbar,
  IconButton,
} from "@mui/material";
import { Height, FitnessCenter, Male, Female } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [bmi, setBmi] = useState(null);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const validateInputs = () => {
    if (!height || !weight) {
      setError("Please enter both height and weight.");
      setOpenSnackbar(true);
      return false;
    }
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      setError("Height and weight must be positive numbers.");
      setOpenSnackbar(true);
      return false;
    }
    return true;
  };

  const calculateBMI = () => {
    if (validateInputs()) {
      const heightInMeters = parseFloat(height) / 100;
      const weightInKg = parseFloat(weight);
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h3" align="center" gutterBottom>
        BMI Calculator
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Assess Your Body Mass Index
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Knowing your Body Mass Index (BMI) can be a useful way to gauge whether
        you're at a healthy weight. Use our BMI Calculator to get insights and
        make informed health decisions.
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Height (cm)"
            variant="outlined"
            fullWidth
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            InputProps={{
              startAdornment: <Height sx={{ mr: 1 }} />,
            }}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Weight (kg)"
            variant="outlined"
            fullWidth
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            InputProps={{
              startAdornment: <FitnessCenter sx={{ mr: 1 }} />,
            }}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Age"
            variant="outlined"
            fullWidth
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            label="Sex"
            variant="outlined"
            fullWidth
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment:
                sex === "male" ? (
                  <Male sx={{ mr: 1 }} />
                ) : (
                  <Female sx={{ mr: 1 }} />
                ),
            }}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={calculateBMI}
          >
            Calculate
          </Button>
        </Grid>
      </Grid>
      {bmi !== null && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h5">Your BMI: {bmi}</Typography>
        </Box>
      )}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          BMI Categories
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <TableContainer component={Paper} sx={{ maxWidth: 600, mx: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">BMI</TableCell>
                <TableCell align="center">Weight Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">Below 18.5</TableCell>
                <TableCell align="center">Underweight</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">18.5 - 24.9</TableCell>
                <TableCell align="center">Healthy</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">25.0 - 29.9</TableCell>
                <TableCell align="center">Overweight</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">30.0 and Above</TableCell>
                <TableCell align="center">Obese</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={error}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

export default BMICalculator;
