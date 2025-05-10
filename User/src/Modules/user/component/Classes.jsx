import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  TablePagination,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
  ThemeProvider,
} from "@mui/material";
import {
  Class as ClassIcon,
  Book as BookIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import moment from "moment";
import config from "../../../config";
import theme from "./theme";
import Header from "./Header";
import Footer from "./Footer";
import { toast } from "react-toastify";

// Styling for the booking dialog
const BookingDialog = ({
  open,
  handleClose,
  handleBook,
  classDetails,
  booking,
  errors,
}) => (
  <Dialog
    open={open}
    onClose={handleClose}
    sx={{ "& .MuiDialog-paper": { padding: 3, borderRadius: 2 } }}
  >
    <DialogTitle
      sx={{ backgroundColor: theme.palette.primary.main, color: "white" }}
    >
      Book Class
    </DialogTitle>
    <DialogContent>
      <Typography variant="h6" gutterBottom>
        {classDetails.name}
      </Typography>
      <Typography variant="subtitle1">
        Instructor: {classDetails.instructor}
      </Typography>
      <Typography variant="subtitle1">
        Date: {moment(classDetails.date).format("MMMM Do, YYYY")}
      </Typography>
      <Typography variant="subtitle1">
        Time: {moment(classDetails.date).format("h:mm A")}
      </Typography>
      {errors.booking && (
        <Typography color="error" sx={{ mt: 2 }}>
          Booking failed. Please try again.
        </Typography>
      )}
    </DialogContent>
    <DialogActions>
      <Button
        onClick={handleClose}
        color="error"
        startIcon={<CancelIcon />}
        disabled={booking}
        sx={{ color: theme.palette.error.main }}
      >
        Cancel
      </Button>
      <Button
        onClick={handleBook}
        color="success"
        startIcon={<BookIcon />}
        disabled={booking}
        sx={{
          backgroundColor: theme.palette.success.main,
          color: "white",
          "&:hover": { backgroundColor: theme.palette.success.dark },
        }}
      >
        {booking ? <CircularProgress size={24} /> : "Book Now"}
      </Button>
    </DialogActions>
  </Dialog>
);

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [open, setOpen] = useState(false);
  const [classToBook, setClassToBook] = useState(null);
  const [booking, setBooking] = useState(false);
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${config.host}/api/class/getClasses`)
      .then((response) => {
        setClasses(response.data);
        setFilteredClasses(response.data);
      })
      .catch((error) => console.log("Error fetching classes:", error));
  }, []);

  useEffect(() => {
    setFilteredClasses(
      classes.filter((classItem) =>
        classItem.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, classes]);

  const handleOpen = (classItem) => {
    setClassToBook(classItem);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setClassToBook(null);
    setErrors({});
  };

  const handleBook = () => {
    setBooking(true);
    console.log("Booking class ID:", classToBook._id); // Debug log
    const token = localStorage.getItem("auth-token");
    axios
      .post(
        `${config.host}/api/class/addbookclass`,
        { classId: classToBook._id },
        { headers: { "auth-token": token } }
      )
      .then((response) => {
        const responseData = response.data;
        if (responseData.success) {
          toast.success(responseData.message); // Display success toast message
          // Optionally close the modal or perform other actions
          handleClose();
        } else {
          toast.error(responseData.message); // Display error message if success is false
        }
      })
      .catch((error) => {
        console.error("Error booking class:", error);
        toast.error("An error occurred while booking the class"); // Display generic error message
      })
      .finally(() => {
        setBooking(false); // Ensure booking state is reset after the request completes
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Box
        sx={{
          position: "relative",
          minHeight: "300px",
          backgroundImage: "url(/assets/images/hero-background.jpg)",
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
          Classes and Schedules
        </Typography>
      </Box>
      <Box sx={{ padding: 3 }}>
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: "bold",
            padding: 1,
            color: theme.palette.primary.main,
          }}
        >
          Book Classes and View Schedules
        </Typography>
        <TextField
          label="Search Classes"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ClassIcon sx={{ color: theme.palette.primary.main }} />
              </InputAdornment>
            ),
          }}
        />
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 2, boxShadow: 3 }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: theme.palette.primary.light }}>
              <TableRow>
                <TableCell>Class Name</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClasses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((classItem) => (
                  <TableRow key={classItem._id}>
                    <TableCell>{classItem.name}</TableCell>
                    <TableCell>{classItem.instructor}</TableCell>
                    <TableCell>
                      {moment(classItem.date).format("MMMM Do, YYYY")}
                    </TableCell>
                    <TableCell>
                      {moment(classItem.date).format("h:mm A")}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpen(classItem)}
                        startIcon={<BookIcon />}
                        sx={{ borderRadius: 2 }}
                      >
                        Book
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredClasses.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ borderTop: `1px solid ${theme.palette.divider}` }}
          />
        </TableContainer>
        {classToBook && (
          <BookingDialog
            open={open}
            handleClose={handleClose}
            handleBook={handleBook}
            classDetails={classToBook}
            booking={booking}
            errors={errors}
          />
        )}
      </Box>
      <Footer />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={errors.booking ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Classes;
