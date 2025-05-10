import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Alert,
  Rating, // Import Rating component from MUI
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { AuthContext } from "../GlobalContext";
import axios from "axios";
import { toast } from 'react-toastify';

const FeedbackManagement = () => {
  const { feedback, setFeedback, host, setFeedbackCount } = useContext(AuthContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [response, setResponse] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);
  const [error, setError] = useState("");

  const handleOpen = (feedbackItem) => {
    setCurrentFeedback(feedbackItem);
    setResponse(feedbackItem.response || "");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setCurrentFeedback(null);
    setResponse("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleResponseSubmit = async () => {
    if (!response) {
      toast.error("Please enter a response.");
      return;
    }
    try {
      const res = await axios.put(`${host}/api/feedback/updatefeedback/${currentFeedback._id}`, { response });
      if (res.data.success) {
        toast.success(res.data.message);
        setFeedbackCount((prev) => prev + 1); // Adjusting the feedback count
        handleClose();
      }
    } catch (err) {
      console.error('Error updating feedback response:', err.message);
      toast.error("Failed to update response.");
    }
  };

  const handleDeleteOpen = (feedbackItem) => {
    setFeedbackToDelete(feedbackItem);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setFeedbackToDelete(null);
  };

  const handleDelete = async () => {
    if (feedbackToDelete) {
      try {
        const res = await axios.delete(`${host}/api/feedback/deletefeedback/${feedbackToDelete._id}`);
        if (res.data.success) {
          setFeedbackCount((prev) => prev + 1); // Adjusting the feedback count
          handleDeleteClose();
          toast.success(res.data.message);
        }
      } catch (err) {
        console.error('Error deleting feedback:', err.message);
        toast.error("Failed to delete feedback.");
      }
    } else {
      setError("No feedback selected for deletion.");
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}
      >
        Manage Feedback
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#ff5722" }}> {/* Background color for header */}
            <TableRow>
              <TableCell align="center" sx={{ color: "white" }}>S.No</TableCell>
              <TableCell align="center" sx={{ color: "white" }}>Name</TableCell>
              <TableCell align="center" sx={{ color: "white" }}>Email</TableCell>
              <TableCell align="center" sx={{ color: "white" }}>Message</TableCell>
              <TableCell align="center" sx={{ color: "white" }}>Star Rating</TableCell> {/* Add this line */}
              <TableCell align="center" sx={{ color: "white" }}>Reply</TableCell>
              <TableCell align="center" sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedback
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((feedbackItem, index) => (
                <TableRow key={feedbackItem._id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{feedbackItem.name}</TableCell>
                  <TableCell align="center">{feedbackItem.email}</TableCell>
                  <TableCell align="center">{feedbackItem.message}</TableCell>
                  <TableCell align="center">
                    <Rating value={feedbackItem.starRating} readOnly /> {/* Add this line */}
                  </TableCell>
                  <TableCell align="center">{feedbackItem?.response || "No Reply"}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpen(feedbackItem)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteOpen(feedbackItem)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={feedback.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Respond to Feedback</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>

          </Typography>
          <TextField
            margin="dense"
            label="Message"
            type="text"
            fullWidth
            multiline
            disabled
            value={currentFeedback?.message}
          />
          <TextField
            margin="dense"
            label="Response"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleResponseSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this feedback?
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FeedbackManagement;