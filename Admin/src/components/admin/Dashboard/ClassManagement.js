import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  TablePagination,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Class as ClassIcon,
  Cancel as CancelIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { deepOrange } from "@mui/material/colors";
import moment from "moment";
import config from "../../../config";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ClassForm = ({
  open,
  handleClose,
  handleSave,
  formValues,
  handleChange,
  handleDateChange,
  handleTimeChange,
  errors,
  saving,
}) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{formValues._id ? "Edit Class" : "Add Class"}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        {formValues._id ? "Update class details" : "Enter class details"}
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        name="name"
        label="Class Name"
        type="text"
        fullWidth
        value={formValues.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name && "Class name is required"}
      />
      <TextField
        margin="dense"
        name="instructor"
        label="Instructor"
        type="text"
        fullWidth
        value={formValues.instructor}
        onChange={handleChange}
        error={!!errors.instructor}
        helperText={errors.instructor && "Instructor name is required"}
      />
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          margin="dense"
          label="Date"
          value={formValues.date}
          onChange={handleDateChange}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              margin="dense"
              error={!!errors.date}
              helperText={errors.date && "Date is required"}
            />
          )}
        />
        <TimePicker
          margin="dense"
          label="Time"
          value={formValues.time}
          onChange={handleTimeChange}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              margin="dense"
              error={!!errors.time}
              helperText={errors.time && "Time is required"}
            />
          )}
        />
      </LocalizationProvider>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={handleClose}
        color="error"
        startIcon={<CancelIcon />}
        disabled={saving}
      >
        Cancel
      </Button>
      <Button
        onClick={handleSave}
        color="success"
        startIcon={<SaveIcon />}
        disabled={saving}
      >
        {saving ? <CircularProgress size={24} /> : "Save"}
      </Button>
    </DialogActions>
  </Dialog>
);

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    instructor: "",
    date: moment(),
    time: moment().startOf("hour").add(1, "hour"), // Default to the next hour
  });
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [saving, setSaving] = useState(false);

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
        classItem?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, classes]);

  const handleOpen = (classItem = null) => {
    setSelectedClass(classItem);
    if (classItem) {
      setFormValues({
        ...classItem,
        date: moment(classItem.date),
        time: moment(classItem.date),
      });
    } else {
      setFormValues({
        name: "",
        instructor: "",
        date: moment(),
        time: moment().startOf("hour").add(1, "hour"), // Default to the next hour
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedClass(null);
    setFormValues({
      name: "",
      instructor: "",
      date: moment(),
      time: moment().startOf("hour").add(1, "hour"),
    });
    setErrors({});
  };

  const handleSave = () => {
    // Validate form fields
    if (
      !formValues.name ||
      !formValues.instructor ||
      !formValues.date ||
      !formValues.time
    ) {
      setErrors({
        name: !formValues.name,
        instructor: !formValues.instructor,
        date: !formValues.date,
        time: !formValues.time,
      });
      return;
    }

    setSaving(true);

    // Determine if we're adding or updating a class
    const url = selectedClass
      ? `${config.host}/api/class/updateClass/${selectedClass._id}`
      : `${config.host}/api/class/addClass`;
    const method = selectedClass ? "put" : "post";

    // Format data to send to the backend
    const data = {
      ...formValues,
      date: formValues.date.toISOString(),
      time: formValues.time.toISOString(),
    };

    // Make API request
    axios({
      method,
      url,
      data,
    })
      .then((response) => {
        const responseData = response.data;

        if (responseData.success) {
          if (selectedClass) {
            toast.success(responseData.message)
            // Update the class in the state
            setClasses(
              classes.map((classItem) =>
                classItem._id === selectedClass._id
                  ? { ...responseData.updatedClass, _id: classItem._id }
                  : classItem
              )
            );
          } else {
            toast.success(responseData.message)
            // Add the new class to the state
            setClasses([...classes, responseData.newClass]);
          }
          handleClose();
        } else {
          console.log("Error:", responseData.message);
          toast.error(responseData.message)
        }
      })
      .catch((error) => console.log("Error saving class:", error))
      .finally(() => setSaving(false));
  };


  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this plan',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#635bff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${config.host}/api/class/deleteClass/${id}`);
          if (response?.data?.success) {
            setClasses(classes?.filter((classItem) => classItem._id !== id));
            toast.success(response?.data?.message);

          } else {
            toast.error(response?.data?.message);
          }
        } catch (error) {
          console.error('Error deleting member:', error);
        }
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleDateChange = (date) => {
    setFormValues({ ...formValues, date });
    setErrors({ ...errors, date: false });
  };

  const handleTimeChange = (time) => {
    setFormValues({ ...formValues, time });
    setErrors({ ...errors, time: false });
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

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: "bold",
          padding: 1,
        }}
      >
        Manage Classes and Schedules
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
              <ClassIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleOpen()}
        sx={{ mb: 2, bgcolor: deepOrange[500], color: "white" }}
      >
        Add Class
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: deepOrange[500] }}>
              <TableCell align="center" sx={{ color: 'white' }}>S.No</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Class Name</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Instructor</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Date</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Time</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {filteredClasses?.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
            
            {filteredClasses
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((classItem, index) => (
                <TableRow key={index}>
                  <TableCell align="center" >{index + 1}</TableCell>
                  <TableCell align="center" >{classItem.name}</TableCell>
                  <TableCell align="center" >{classItem.instructor}</TableCell>
                  <TableCell align="center" >{moment(classItem.date).format("MM/DD/YYYY")}</TableCell>
                  <TableCell align="center" >{moment(classItem.date).format("HH:mm")}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleOpen(classItem)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(classItem._id)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredClasses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <ClassForm
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
        formValues={formValues}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        handleTimeChange={handleTimeChange}
        errors={errors}
        saving={saving}
      />
    </Box>
  );
};

export default ClassManagement;